import TelegramBotApi, { Message, SendMessageOptions } from "node-telegram-bot-api";
import { ClassifyRequest, ClassifyReply } from "@rapydbot/intent-recognition/client";
import { Bot } from "../Bot";

export class IntentRecognitionHandler {
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async classify(msg: Message) {
    return new Promise((resolve, reject) => {
      const request = new ClassifyRequest();

      request.setInput(msg.text);

      this.bot.clients.intentRecognition.classify(request, (error, reply) => {
        if (Boolean(error)) {
          return reject(error);
        }

        const action = reply.getAction();

        resolve(action);
      });
    });
  }
}
