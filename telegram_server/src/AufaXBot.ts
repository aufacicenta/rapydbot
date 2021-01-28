import { injectable } from "inversify";
import TelegramBotApi from "node-telegram-bot-api";
import "reflect-metadata";
import { BotFileHandler } from "./BotFileHandler";
import { BotPassportTypeFileHandler } from "./BotPassportTypeFileHandler";
import { container } from "./container";

const TOKEN = "1690293681:AAESnPBd2NTUlgx9TWMTDEmg3hyG7uUfFfQ";

@injectable()
export class AufaXBot {
  static type = "AufaXBot";

  public api: TelegramBotApi;

  constructor() {
    this.api = new TelegramBotApi(TOKEN, { polling: true });
  }

  init() {
    this.api.on("message", (msg) => {
      const telegramPassportData = msg?.passport_data?.data;

      if (Boolean(telegramPassportData)) {
        const botFileHandler = container.get<BotFileHandler>(
          BotFileHandler.type
        );

        botFileHandler.decipherCredentials(msg.passport_data.credentials);

        telegramPassportData?.forEach((data) => {
          switch (data.type) {
            case "passport":
              const botPassportTypeFileHandler = container.get<BotPassportTypeFileHandler>(
                BotPassportTypeFileHandler.type
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
