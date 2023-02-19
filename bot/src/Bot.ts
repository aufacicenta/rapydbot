import { Channel, DefaultGenerics, StreamChat } from "stream-chat";
import { UserClient, UserClientGenerator } from "@rapydbot/user/client";
import { WalletClient, WalletClientGenerator } from "@rapydbot/wallet/client";
import {
  IntentRecognitionClient,
  IntentRecognitionClientGenerator,
} from "@rapydbot/intent-recognition/client";
import moment, { Moment } from "moment";
import TelegramBotApi, { SendMessageOptions } from "node-telegram-bot-api";

import {
  BotLanguageHandler,
  BotReplyToMessageIdHandler,
  BotReplyToMessageIdHandlerStorageKeys,
} from "./handler";
import { translationKeys } from "./i18n";
import { Commands, CustomMessage } from "./types";
import { IntentRecognitionHandler } from "./handler/intent-recognition";
import { StartCommand } from "./commands";

export class Bot {
  public api: TelegramBotApi;

  public moment: Moment;

  public handlers: {
    language?: BotLanguageHandler;
    intentRecognition?: IntentRecognitionHandler;
  } = {};

  public clients: {
    user?: UserClient;
    wallet?: WalletClient;
    intentRecognition?: IntentRecognitionClient;
  } = {};

  public commands: Commands = {};

  public context: {
    chat?: StreamChat<DefaultGenerics>;
    channel?: Channel<DefaultGenerics>;
  } = {};

  public replyToMessageIDMap = new Map<number, BotReplyToMessageIdHandler>();

  constructor() {
    this.api = new TelegramBotApi(process.env.BOT_TOKEN, { polling: true });

    this.handlers.language = new BotLanguageHandler();
    this.handlers.intentRecognition = new IntentRecognitionHandler(this);

    this.moment = moment();

    this.clients.user = new UserClientGenerator(process.env.USER_SERVICE_URL).create();
    this.clients.wallet = new WalletClientGenerator(process.env.WALLET_SERVICE_URL).create();

    this.clients.intentRecognition = new IntentRecognitionClientGenerator(
      process.env.INTENT_RECOGNITION_SERVICE_URL,
    ).create();
    // this.clients.intentRecognition.classify.bind(this.clients.intentRecognition);

    this.commands.start = new StartCommand(this);
    this.commands.start.onText.bind(this.commands.start);
  }

  async prepare(): Promise<Bot> {
    await this.handlers.language.init();

    // leverage stream-chat to store the context of a conversation
    const streamChat = StreamChat.getInstance(
      "ms9ftjmh25rd",
      "3yrjqve2k669njd4q9ked9qy7e8g5kjsyrbquw6kemaas88mdzehnvpwwdanz7g3",
    );

    const channel = streamChat.channel("messaging", "bot-context", { created_by_id: "bot" });
    await channel.create();

    this.context.chat = streamChat;
    this.context.channel = channel;

    return this;
  }

  listen() {
    this.api.onText(/^\/start/i, (msg) => this.commands.start.onText(msg));

    this.api.on("polling_error", console.error);

    this.api.on("inline_query", (msg) => {
      console.log(msg);
    });

    this.api.on("message", async (msg) => {
      // @TODO record every message for training purposes
      try {
        const { message } = await this.context.channel.sendMessage({
          text: msg.text,
          // parent_id: msg.chat.id.toString(),
          user_id: msg.from.id.toString(),
          silent: true,
          skip_push: true,
        });
        // @TODO search stream messages by user.id
        // const userMessages = await this.context.chat.search(
        //   {
        //     cid: "messaging:bot-context",
        //   },
        //   {
        //     "user.id": { $eq: msg.from.id.toString() },
        //   },
        // );
        // @TODO detect message intent with the classify service and execute the command
        const context = { chat: { message: { id: message.id } } };
        const command = await this.handlers.intentRecognition.classify({ ...msg, context });

        await this.context.chat.updateMessage({
          id: message.id,
          user_id: msg.from.id.toString(),
          silent: true,
          text: message.text,
          html: message.html,
          attachments: [
            { type: "text", fields: [{ title: "intent", value: command, short: true }] },
          ],
        });

        // @TODO map command to the corresponding class,
        // extract the entities from the text message and
        // create a data request record, if values are missing, let the bot ask for them with ChatGPT
      } catch (error) {
        // @TODO handle error reply from error reason send by the servers
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

  public clearCommandHandler(chat_id: number) {
    return this.replyToMessageIDMap.delete(chat_id);
  }

  public getReplyToMessageIdHandler(chat_id: number) {
    return this.replyToMessageIDMap.get(chat_id);
  }
}
