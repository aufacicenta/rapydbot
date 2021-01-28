import TelegramBotApi from "node-telegram-bot-api";
import { BotPassportTypeFileHandler } from "./BotPassportTypeFileHandler";

const TOKEN = "1690293681:AAESnPBd2NTUlgx9TWMTDEmg3hyG7uUfFfQ";

export class AufaXBot {
  static type = "AufaXBot";

  public api: TelegramBotApi;

  constructor() {
    this.api = new TelegramBotApi(TOKEN, { polling: true });
  }

  init() {
    this.api.on("message", async (msg) => {
      const telegramPassportData = msg?.passport_data?.data;

      if (Boolean(telegramPassportData)) {
        telegramPassportData?.forEach((data) => {
          switch (data.type) {
            case "passport":
              const botPassportTypeFileHandler = new BotPassportTypeFileHandler(
                this
              );
              botPassportTypeFileHandler.decipherCredentials(
                msg.passport_data.credentials
              );
              botPassportTypeFileHandler.processEncryptedData(data, msg);
              break;
            case "bank_statement":
              break;
            default:
              break;
          }
        });
      }

      //   bot.sendMessage(chatId, "Received your message");
    });
  }
}
