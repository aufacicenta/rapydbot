import { StreamChat } from "stream-chat";
import { UserClientGenerator } from "@rapydbot/user";
import { IntentAction } from "@rapydbot/intent-recognition/providers/cohere/types";
import moment, { Moment } from "moment";
import TelegramBotApi, { SendMessageOptions } from "node-telegram-bot-api";
import { CampaignClientGenerator } from "@rapydbot/campaign";

import {
  BotLanguageHandler,
  BotReplyToMessageIdHandler,
  BotReplyToMessageIdHandlerStorageKeys,
} from "./handler";
import { translationKeys } from "./i18n";
import { Clients, Commands, Context, CustomMessage, Handlers } from "./types";
import { IntentRecognitionHandler } from "./handler/intent-recognition";
import { StartCommand } from "./commands";
import { TrainCommand } from "./commands/train";
import { IBotCommand } from "./commands/types";
import { CreateWalletCommand } from "./commands/wallet/create";
import { ContextHandler } from "./handler/context";
import { UserLocationHandler } from "./handler/location";
import { CreateCampaignCommand } from "./commands/campaign/create";

const {
  BOT_TOKEN,
  USER_SERVICE_URL,
  WALLET_SERVICE_URL,
  INTENT_RECOGNITION_SERVICE_URL,
  CAMPAIGN_SERVICE_URL,
  STREAM_CHAT_API_KEY,
  STREAM_CHAT_API_SECRET,
} = process.env;

export class TGInformerBot {
  public api: TelegramBotApi;

  public moment: Moment;

  // Handle text messages, but won't produce replies
  public handlers: Handlers = {};

  // Communicate to gRPC servers
  public clients: Clients = {};

  // Commands send replies
  public commands: Commands = {
    campaign: {
      create: undefined,
    },
  };

  public context: Context = {};

  public replyToMessageIDMap = new Map<number, BotReplyToMessageIdHandler>();

  public intentActionsToCommandsMap = new Map<IntentAction, IBotCommand>();

  constructor() {
    this.api = new TelegramBotApi(BOT_TOKEN, { polling: true });

    this.moment = moment();

    this.setHandlers();

    this.setClients();

    this.setCommands();
  }

  async prepare(): Promise<TGInformerBot> {
    await this.handlers.language.init();

    await this.prepareContext();

    this.mapIntentActionsToCommands();

    return this;
  }

  listen() {
    this.api.onText(/^\/start/i, (msg) => {
      try {
        this.commands.start.onText(msg);
      } catch (error) {
        console.log(error);
      }
    });

    this.api.onText(/^\/crearcampaña/i, (msg) => {
      try {
        this.commands.campaign.create.onText(msg);
      } catch (error) {
        console.log(error);
      }
    });

    this.api.onText(/^\/?(train|entrenar)/i, (msg) => {
      this.commands.train.runTrainingQueue(msg);
    });

    this.api.on("polling_error", console.error);

    this.api.on("inline_query", (msg) => {
      console.log(msg);
    });

    this.api.on("message", async (msg) => {
      try {
        if (/^\/(start|crearcampaña)/i.test(msg.text)) {
          return;
        }

        if (msg.location?.latitude && msg.location?.longitude) {
          this.handlers.location.setLocation(msg);
        } else {
          this.commands.train.onText(msg);
        }
      } catch (error) {
        // @TODO handle error reply from error reason sent by the servers, handlers or commands
        console.error(error);
      }
    });
  }

  reply(msg: CustomMessage, text: string, options?: SendMessageOptions): Promise<void> {
    // @TODO text should be a ChatGPT response by using the reponse params

    return new Promise((resolve) => {
      this.api.sendMessage(msg.chat.id, text, {
        parse_mode: "HTML",
        disable_web_page_preview: true,
        ...options,
      });

      setTimeout(() => {
        resolve();
      }, 300);
    });
  }

  replyWithTranslation(
    msg: CustomMessage,
    translationKey: translationKeys,
    options?: SendMessageOptions,
    args?: Record<string, unknown>,
  ) {
    this.api.sendMessage(
      msg.chat.id,
      this.handlers.language.getTranslation(msg, translationKey, args),
      { parse_mode: "HTML", disable_web_page_preview: true, ...options },
    );
  }

  replyWithMessageID(
    msg: CustomMessage,
    translationKey: translationKeys,
    command: Commands,
    handlerData?: Record<string, unknown>,
    reply_to_message_id?: number,
    options?: SendMessageOptions,
    args?: Record<string, unknown>,
  ) {
    const chat_id = msg.chat.id;

    let handler = this.getReplyToMessageIdHandler(chat_id);

    if (!Boolean(handler)) {
      handler = new BotReplyToMessageIdHandler(this, command);
      handler.id = chat_id;
      this.replyToMessageIDMap.set(chat_id, handler);
    }

    if (Boolean(handlerData)) {
      Object.keys(handlerData).forEach((key: keyof BotReplyToMessageIdHandlerStorageKeys) => {
        handler.storage.set(key, handlerData[key]);
      });
    }

    this.replyWithTranslation(
      msg,
      translationKey,
      {
        reply_to_message_id: reply_to_message_id ?? msg.message_id,
        reply_markup: { force_reply: true },
        ...options,
      },
      args,
    );
  }

  replyWithHandler(
    msg: CustomMessage,
    translationKey: translationKeys,
    command: Commands,
    handlerData?: Record<string, unknown>,
    options?: SendMessageOptions,
    args?: Record<string, unknown>,
  ) {
    const chat_id = msg.chat.id;

    let handler = this.getReplyToMessageIdHandler(chat_id);

    if (!Boolean(handler)) {
      handler = new BotReplyToMessageIdHandler(this, command);
      handler.id = chat_id;
      this.replyToMessageIDMap.set(chat_id, handler);
    }

    if (Boolean(handlerData)) {
      Object.keys(handlerData).forEach((key: keyof BotReplyToMessageIdHandlerStorageKeys) => {
        handler.storage.set(key, handlerData[key]);
      });
    }

    this.replyWithTranslation(
      msg,
      translationKey,
      {
        ...options,
      },
      args,
    );
  }

  getTranslation(
    msg: CustomMessage,
    translationKey: translationKeys,
    args?: Record<string, unknown>,
  ) {
    return this.handlers.language.getTranslation(msg, translationKey, args);
  }

  clearCommandHandler(chat_id: number) {
    return this.replyToMessageIDMap.delete(chat_id);
  }

  getReplyToMessageIdHandler(chat_id: number) {
    return this.replyToMessageIDMap.get(chat_id);
  }

  private setHandlers() {
    this.handlers.language = new BotLanguageHandler();
    this.handlers.intentRecognition = new IntentRecognitionHandler(this);
    this.handlers.context = new ContextHandler(this);
    this.handlers.location = new UserLocationHandler(this);
  }

  private setClients() {
    this.clients.user = new UserClientGenerator(USER_SERVICE_URL).create();

    // this.clients.wallet = new WalletClientGenerator(WALLET_SERVICE_URL).create();

    // this.clients.intentRecognition = new IntentRecognitionClientGenerator(
    //   INTENT_RECOGNITION_SERVICE_URL,
    // ).create();

    this.clients.campaign = new CampaignClientGenerator(CAMPAIGN_SERVICE_URL).create();
  }

  private setCommands() {
    this.commands.start = new StartCommand(this);
    this.commands.start.onText.bind(this.commands.start);

    this.commands.train = new TrainCommand(this);
    this.commands.train.onText.bind(this.commands.train);

    this.commands.createWallet = new CreateWalletCommand(this);
    this.commands.createWallet.onText.bind(this.commands.createWallet);

    this.commands.campaign.create = new CreateCampaignCommand(this);
    this.commands.campaign.create.onText.bind(this.commands.campaign.create);
  }

  private async prepareContext() {
    // leverage stream-chat to store the context of a conversation
    const streamChat = StreamChat.getInstance(STREAM_CHAT_API_KEY, STREAM_CHAT_API_SECRET);

    const channel = streamChat.channel("messaging", "bot-context", { created_by_id: "bot" });
    await channel.create();

    // @TODO abstract to local class to control methods
    this.context.chat = streamChat;
    this.context.channel = channel;
  }

  private async mapIntentActionsToCommands() {
    this.intentActionsToCommandsMap.set(IntentAction.WalletCreate, this.commands.createWallet);
  }
}
