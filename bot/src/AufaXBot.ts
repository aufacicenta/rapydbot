import TelegramBotApi, { Message } from "node-telegram-bot-api";
import { BotLanguageHandler, BotPassportTypeFileHandler } from "./handler";

const TOKEN = "1690293681:AAESnPBd2NTUlgx9TWMTDEmg3hyG7uUfFfQ";

export class AufaXBot {
  public api: TelegramBotApi;

  private languageHandler: BotLanguageHandler;

  constructor() {
    this.api = new TelegramBotApi(TOKEN, { polling: true });
    this.languageHandler = new BotLanguageHandler();
  }

  listen() {
    this.languageHandler.init();

    const botPassportDataTypeFileHandler = new BotPassportTypeFileHandler(this);

    this.api.on("message", async (msg) => {
      const chatId = msg.chat.id;

      if (Boolean(msg.passport_data)) {
        botPassportDataTypeFileHandler.processEncryptedData(msg);
        return;
      }
    });
  }

  reply(msg: Message, translationKey: string) {
    this.api.sendMessage(
      msg.chat.id,
      this.languageHandler.getTranslation(msg, translationKey),
      { parse_mode: "MarkdownV2" }
    );
  }
}
