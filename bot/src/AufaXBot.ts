import KYC_ClientGenerator, { KYCClient } from "@aufax/kyc/client";
import Price_ClientGenerator, { PriceClient } from "@aufax/price/client";
import Transaction_ClientGenerator, {
  TransactionClient,
} from "@aufax/transaction/client";
import USER_ClientGenerator, { UserClient } from "@aufax/user/client";
import { Moment } from "moment";
import TelegramBotApi, {
  Message,
  SendMessageOptions,
} from "node-telegram-bot-api";
import { BuyCommand, SellCommand, StartCommand } from "./commands";
import {
  BotLanguageHandler,
  BotPassportTypeFileHandler,
  BotReplyToMessageIdHandler,
} from "./handler";
import { Commands } from "./types";

const TOKEN = "1690293681:AAESnPBd2NTUlgx9TWMTDEmg3hyG7uUfFfQ";

export class AufaXBot {
  public api: TelegramBotApi;
  public moment: Moment;

  private languageHandler: BotLanguageHandler;
  private botPassportDataTypeFileHandler: BotPassportTypeFileHandler;

  public KYCServiceClient: KYCClient;
  public UserServiceClient: UserClient;
  public TransactionServiceClient: TransactionClient;
  public PriceServiceClient: PriceClient;

  private sellCommand: SellCommand;
  private buyCommand: BuyCommand;
  private startCommand: StartCommand;

  public replyToMessageIDMap = new Map<number, BotReplyToMessageIdHandler>();

  constructor() {
    this.api = new TelegramBotApi(TOKEN, { polling: true });
    this.languageHandler = new BotLanguageHandler();
    this.botPassportDataTypeFileHandler = new BotPassportTypeFileHandler(this);

    this.KYCServiceClient = new KYC_ClientGenerator("127.0.0.1:30040").create();
    this.UserServiceClient = new USER_ClientGenerator(
      "127.0.0.1:30041"
    ).create();
    this.TransactionServiceClient = new Transaction_ClientGenerator(
      "127.0.0.1:30042"
    ).create();
    this.PriceServiceClient = new Price_ClientGenerator(
      "127.0.0.1:30043"
    ).create();

    this.sellCommand = new SellCommand(this);
    this.buyCommand = new BuyCommand(this);
    // this.startCommand = new StartCommand(this);
  }

  async prepare(): Promise<AufaXBot> {
    await this.languageHandler.init();
    return this;
  }

  listen() {
    this.api.on("polling_error", console.error);

    this.api.on("message", async (msg) => {
      const reply_to_message_id = msg.reply_to_message?.message_id - 1;
      if (Boolean(reply_to_message_id)) {
        const handler = this.getReplyToMessageIdHandler(msg.chat.id);
        const command = handler?.command;

        if (!Boolean(command)) {
          return;
        }

        return command.onReplyFromMessageID(msg, handler);
      }

      if (Boolean(msg.passport_data)) {
        return this.botPassportDataTypeFileHandler.processEncryptedData(msg);
      }

      // TODO no answers reply
    });

    this.api.onText(/^\/start/i, (msg, match) => this.startCommand.onText(msg));
    this.api.onText(/^\/sell/i, (msg, match) => this.sellCommand.onText(msg));
    this.api.onText(/^\/buy/i, (msg, match) => this.buyCommand.onText(msg));
  }

  reply(
    msg: Message,
    translationKey: string,
    options?: SendMessageOptions,
    args?: {}
  ) {
    this.api.sendMessage(
      msg.chat.id,
      this.languageHandler.getTranslation(msg, translationKey, args),
      { parse_mode: "HTML", ...options }
    );
  }

  replyWithMessageID(
    msg: Message,
    translationKey: string,
    command: Commands,
    reply_to_message_id?: number,
    options?: SendMessageOptions,
    args?: {}
  ) {
    const chat_id = msg.chat.id;

    let handler = this.getReplyToMessageIdHandler(chat_id);

    if (!Boolean(handler)) {
      handler = new BotReplyToMessageIdHandler(this, command);
      handler.id = chat_id;
      this.replyToMessageIDMap.set(chat_id, handler);
    }

    this.reply(
      msg,
      translationKey,
      {
        reply_to_message_id: reply_to_message_id ?? msg.message_id,
        reply_markup: { force_reply: true },
        ...options,
      },
      args
    );
  }

  getTranslation(msg: Message, translationKey: string, args?: {}) {
    return this.languageHandler.getTranslation(msg, translationKey, args);
  }

  private getReplyToMessageIdHandler(chat_id: number) {
    return this.replyToMessageIDMap.get(chat_id);
  }
}
