import TelegramBotApi from "node-telegram-bot-api";
import { BotPassportTypeFileHandler } from "./handler";

const TOKEN = "1690293681:AAESnPBd2NTUlgx9TWMTDEmg3hyG7uUfFfQ";

export class AufaXBot {
  public api: TelegramBotApi;

  constructor() {
    this.api = new TelegramBotApi(TOKEN, { polling: true });
  }

  listen() {
    this.api.on("message", async (msg) => {
      const telegramPassportData = msg?.passport_data?.data;

      if (Boolean(telegramPassportData)) {
        telegramPassportData?.forEach((data) => {
          switch (data.type) {
            case "passport":
              const handler = new BotPassportTypeFileHandler(this);
              handler
                .decipherCredentials(msg.passport_data.credentials)
                .processEncryptedData(data, msg);
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
