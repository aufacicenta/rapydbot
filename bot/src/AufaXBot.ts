import KYC_ClientGenerator, { KYCClient } from "@aufax/kyc/client";
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
import { BotLanguageHandler, BotPassportTypeFileHandler } from "./handler";

const TOKEN = "1690293681:AAESnPBd2NTUlgx9TWMTDEmg3hyG7uUfFfQ";

type Commands = SellCommand;

export class AufaXBot {
  public api: TelegramBotApi;
  public moment: Moment;

  private languageHandler: BotLanguageHandler;
  private botPassportDataTypeFileHandler: BotPassportTypeFileHandler;

  public KYCServiceClient: KYCClient;
  public UserServiceClient: UserClient;
  public TransactionServiceClient: TransactionClient;

  private sellCommand: SellCommand;
  private buyCommand: BuyCommand;
  private startCommand: StartCommand;

  private replyToMessageIDMap = new Map<number, Commands>();

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

    this.sellCommand = new SellCommand(this);
    // this.buyCommand = new BuyCommand(this);
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
        const command = this.replyToMessageIDMap.get(reply_to_message_id);

        if (!Boolean(command)) {
          return;
        }

        this.replyToMessageIDMap.delete(reply_to_message_id);

        return command.onReplyFromMessageID(msg);
      }

      if (Boolean(msg.passport_data)) {
        return this.botPassportDataTypeFileHandler.processEncryptedData(msg);
      }

      // TODO no answers reply
    });

    this.api.on("callback_query", async (msg) => {
      console.log(msg);
      // TODO this will be called on clicking the "attach purchase bank note" button
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
    reply_to_message_id: number,
    command: Commands,
    options?: SendMessageOptions,
    args?: {}
  ) {
    this.replyToMessageIDMap.set(reply_to_message_id, command);

    this.reply(
      msg,
      translationKey,
      {
        reply_to_message_id,
        reply_markup: { force_reply: true },
        ...options,
      },
      args
    );
  }

  getTranslation(msg: Message, translationKey: string, args?: {}) {
    return this.languageHandler.getTranslation(msg, translationKey, args);
  }
}
