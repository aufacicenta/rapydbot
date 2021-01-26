import TelegramBotApi from "node-telegram-bot-api";

const TOKEN = "1690293681:AAESnPBd2NTUlgx9TWMTDEmg3hyG7uUfFfQ";

const bot = new TelegramBotApi(TOKEN, { polling: true });

export class AufaXBot {
  init() {
    bot.on("message", (msg) => {
      const chatId = msg.chat.id;
      //   bot.sendMessage(chatId, "Received your message");
    });
  }
}
