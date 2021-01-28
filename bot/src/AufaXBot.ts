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
      const chatId = msg.chat.id;

      if (Boolean(msg.passport_data)) {
        const handler = new BotPassportTypeFileHandler(this);
        handler.processEncryptedData(msg);
        this.api.sendMessage(
          chatId,
          "Recibimos tu información y está siendo procesada. Te enviaremos un mensaje con los detalles de tu aprobación dentro de las próximas 24 horas. Tu información está protegida con encriptación MTProto 🔒"
        );
        return;
      }
    });
  }
}
