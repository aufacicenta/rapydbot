import { ClassifyRequest } from "@rapydbot/intent-recognition/client";

import { Bot } from "../Bot";
import { CustomMessage } from "../types";

export class IntentRecognitionHandler {
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async classify(msg: CustomMessage) {
    const request = new ClassifyRequest();

    request.setInput(msg.text);

    return new Promise((resolve, reject) => {
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
