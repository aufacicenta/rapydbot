import { StreamChat } from "stream-chat";
import { UserClientGenerator } from "@rapydbot/user/client";
import { WalletClientGenerator } from "@rapydbot/wallet/client";
import { IntentAction } from "@rapydbot/intent-recognition/providers/cohere/types";
import moment, { Moment } from "moment";
import TelegramBotApi, { SendMessageOptions } from "node-telegram-bot-api";
import IntentRecognitionClientGenerator from "@rapydbot/intent-recognition/client";

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

const {
  BOT_TOKEN,
  USER_SERVICE_URL,
  WALLET_SERVICE_URL,
  INTENT_RECOGNITION_SERVICE_URL,
  STREAM_CHAT_API_KEY,
  STREAM_CHAT_API_SECRET,
} = process.env;

export class Bot {
  public api: TelegramBotApi;

  public moment: Moment;

  // Handle text messages, but won't produce replies
  public handlers: Handlers = {};

  // Communicate to gRPC servers
  public clients: Clients = {};

  // Commands send replies
  public commands: Commands = {};

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

  async prepare(): Promise<Bot> {
    await this.handlers.language.init();

    await this.prepareContext();

    this.mapIntentActionsToCommands();

    return this;
  }

  listen() {
    this.api.onText(/^\/start/i, (msg) => this.commands.start.onText(msg));

    this.api.onText(/^\/?(train|entrenar)/i, (msg) => {
      this.commands.train.runTrainingQueue(msg);
    });

    this.api.on("polling_error", console.error);

    this.api.on("inline_query", (msg) => {
      console.log(msg);
    });

    this.api.on("message", async (msg) => {
      const isTraining = true;

      if (isTraining) {
        this.commands.train.onText(msg);

        return;
      }

      try {
        // Record the message in the database
        const message = await this.handlers.context.sendMessage(msg);

        const context = { chat: { message } };
        const customMessage = { ...msg, context };

        // Identify the IntentAction from the message text
        const command = await this.handlers.intentRecognition.classify(customMessage);

        // Update the message with the IntentAction as an attachment
        await this.handlers.context.updateMessage(customMessage, [
          { type: "text", fields: [{ title: "intent", value: command, short: true }] },
        ]);

        // Execute the command
        this.handlers.intentRecognition.onCommand(command, customMessage);

        // @TODO extract the entities from the text message and
        // create a data request record, if values are missing, let the bot ask for them with ChatGPT
      } catch (error) {
        // @TODO handle error reply from error reason sent by the servers, handlers or commands
        console.error(error);
      }
    });
  }

  reply(msg: CustomMessage, text: string, options?: SendMessageOptions) {
    // @TODO text should be a ChatGPT response by using the reponse params

    this.api.sendMessage(msg.chat.id, text, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
      ...options,
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
  }

  private setClients() {
    this.clients.user = new UserClientGenerator(USER_SERVICE_URL).create();

    this.clients.wallet = new WalletClientGenerator(WALLET_SERVICE_URL).create();

    this.clients.intentRecognition = new IntentRecognitionClientGenerator(
      INTENT_RECOGNITION_SERVICE_URL,
    ).create();
    // this.clients.intentRecognition.classify.bind(this.clients.intentRecognition);
  }

  private setCommands() {
    this.commands.start = new StartCommand(this);
    this.commands.start.onText.bind(this.commands.start);

    this.commands.train = new TrainCommand(this);
    this.commands.train.onText.bind(this.commands.train);

    this.commands.createWallet = new CreateWalletCommand(this);
    this.commands.createWallet.onText.bind(this.commands.createWallet);
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
