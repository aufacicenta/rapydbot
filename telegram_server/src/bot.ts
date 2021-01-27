import { injectable } from "inversify";
import TelegramBotApi, {
  EncryptedPassportElement,
  PassportFile,
} from "node-telegram-bot-api";
import "reflect-metadata";
import { BotFileHandler } from "./BotFileHandler";

const TOKEN = "1690293681:AAESnPBd2NTUlgx9TWMTDEmg3hyG7uUfFfQ";

@injectable()
export class AufaXBot {
  api: TelegramBotApi;

  constructor() {
    this.api = new TelegramBotApi(TOKEN, { polling: true });
  }

  init() {
    this.api.on("message", (msg) => {
      const chatId = msg.chat.id;
      const telegramPassportData = msg?.passport_data?.data;

      if (Boolean(telegramPassportData)) {
        const passport = telegramPassportData?.filter(
          (data) => data.type === "passport"
        )[0];

        if (Boolean(passport)) {
          const botFileHandler = new BotFileHandler(this);
          botFileHandler.downloadFile(
            ((passport as EncryptedPassportElement).front_side as PassportFile)
              .file_id,
            `./tmp/${msg.chat.username}`
          );
          botFileHandler.downloadFile(
            ((passport as EncryptedPassportElement).selfie as PassportFile)
              .file_id,
            `./tmp/${msg.chat.username}`
          );
        }
      }

      //   bot.sendMessage(chatId, "Received your message");
    });
  }
}
