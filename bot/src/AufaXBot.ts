import TelegramBotApi, {
  Message,
  SendMessageOptions,
} from "node-telegram-bot-api";
import { BuyCommand, SellCommand, StartCommand } from "./commands";
import { BotLanguageHandler, BotPassportTypeFileHandler } from "./handler";

const TOKEN = "1690293681:AAESnPBd2NTUlgx9TWMTDEmg3hyG7uUfFfQ";

export class AufaXBot {
  public api: TelegramBotApi;

  private languageHandler: BotLanguageHandler;
  private botPassportDataTypeFileHandler: BotPassportTypeFileHandler;

  constructor() {
    this.api = new TelegramBotApi(TOKEN, { polling: true });
    this.languageHandler = new BotLanguageHandler();
    this.botPassportDataTypeFileHandler = new BotPassportTypeFileHandler(this);
  }

  async prepare(): Promise<AufaXBot> {
    await this.languageHandler.init();
    return this;
  }

  listen() {
    this.api.on("polling_error", console.error);

    this.api.on("message", async (msg) => {
      if (Boolean(msg.passport_data)) {
        return this.botPassportDataTypeFileHandler.processEncryptedData(msg);
      }
    });

    this.api.on("callback_query", async (msg) => {
      console.log(msg);
      // TODO this will be called on clicking the "attach purchase bank note" button
    });

    this.api.onText(/^\/start/i, (msg, match) =>
      new StartCommand(this).onText(msg)
    );
    this.api.onText(/^\/sell/i, (msg, match) =>
      new SellCommand(this).onText(msg)
    );
    this.api.onText(/^\/buy/i, (msg, match) =>
      new BuyCommand(this).onText(msg)
    );
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

  getTranslation(msg: Message, translationKey: string, args?: {}) {
    return this.languageHandler.getTranslation(msg, translationKey, args);
  }
}
