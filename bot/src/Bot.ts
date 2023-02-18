import { UserClient } from "@rapydbot/user/client";
import { WalletClient, WalletClientGenerator } from "@rapydbot/wallet/client";
import {
  IntentRecognitionClient,
  IntentRecognitionClientGenerator,
} from "@rapydbot/intent-recognition/client";
import moment, { Moment } from "moment";
import TelegramBotApi, { Message, SendMessageOptions } from "node-telegram-bot-api";
import {
  BotLanguageHandler,
  BotReplyToMessageIdHandler,
  BotReplyToMessageIdHandlerStorageKeys,
} from "./handler";
import { translationKeys } from "./i18n";
import { Commands } from "./types";
import { IntentRecognitionHandler } from "./handler/intent-recognition";

export class Bot {
  public api: TelegramBotApi;
  public moment: Moment;

  public handlers: {
    language: BotLanguageHandler;
    intentRecognition: IntentRecognitionHandler;
  };

  public clients: {
    user: UserClient;
    wallet: WalletClient;
    intentRecognition: IntentRecognitionClient;
  };

  public commands: Commands;

  public replyToMessageIDMap = new Map<number, BotReplyToMessageIdHandler>();

  constructor() {
    this.api = new TelegramBotApi(process.env.BOT_TOKEN, { polling: true });

    this.handlers.language = new BotLanguageHandler();
    this.handlers.intentRecognition = new IntentRecognitionHandler(this);

    this.moment = moment();

    this.clients.wallet = new WalletClientGenerator(process.env.WALLET_SERVICE_URL).create();
    this.clients.intentRecognition = new IntentRecognitionClientGenerator(
      process.env.INTENT_RECOGNITION_SERVICE_URL,
    ).create();
  }

  async prepare(): Promise<Bot> {
    await this.handlers.language.init();
    return this;
  }

  listen() {
    this.api.on("polling_error", console.error);

    this.api.on("inline_query", (msg) => {
      console.log(msg);
    });

    this.api.on("message", async (msg) => {
      // @TODO record every message for training purposes, async
      // @TODO detect message intent with the classify service and execute the command
      // @TODO extract the entities from the text message and create a data request record, if values are missing, let the bot ask for them
    });
  }

  reply(msg: Message, text: string, options?: SendMessageOptions, args?: {}) {
    // @TODO text should be a ChatGPT response by using the reponse params

    this.api.sendMessage(msg.chat.id, text, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
      ...options,
    });
  }

  replyWithTranslation(
    msg: Message,
    translationKey: translationKeys,
    options?: SendMessageOptions,
    args?: {},
  ) {
    this.api.sendMessage(
      msg.chat.id,
      this.handlers.language.getTranslation(msg, translationKey, args),
      { parse_mode: "HTML", disable_web_page_preview: true, ...options },
    );
  }

  replyWithMessageID(
    msg: Message,
    translationKey: translationKeys,
    command: Commands,
    handlerData?: Record<string, any>,
    reply_to_message_id?: number,
    options?: SendMessageOptions,
    args?: {},
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
    msg: Message,
    translationKey: translationKeys,
    command: Commands,
    handlerData?: Record<string, any>,
    options?: SendMessageOptions,
    args?: {},
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

  getTranslation(msg: Message, translationKey: translationKeys, args?: {}) {
    return this.handlers.language.getTranslation(msg, translationKey, args);
  }

  public clearCommandHandler(chat_id: number) {
    return this.replyToMessageIDMap.delete(chat_id);
  }

  public getReplyToMessageIdHandler(chat_id: number) {
    return this.replyToMessageIDMap.get(chat_id);
  }
}
