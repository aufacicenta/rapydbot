import { ClassifyRequest } from "@rapydbot/intent-recognition/client";
import { IntentAction } from "@rapydbot/intent-recognition/providers/cohere/types";

import { Bot } from "../Bot";
import { CustomMessage } from "../types";

export class IntentRecognitionHandler {
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  onCommand(command: IntentAction, msg: CustomMessage) {
    try {
      const action = this.bot.intentActionsToCommandsMap.get(command);

      action.onText(msg);
    } catch (error) {
      console.log(error);
      throw new Error("IntentRecognitionHandler UNRESOLVED_COMMAND");
    }
  }

  async classify(msg: CustomMessage): Promise<IntentAction> {
    const request = new ClassifyRequest();

    request.setInput(msg.text);

    return new Promise((resolve, reject) => {
      this.bot.clients.intentRecognition.classify(request, (error, reply) => {
        if (Boolean(error)) {
          return reject(error);
        }

        const action = reply.getAction();

        resolve(action as IntentAction);
      });
    });
  }
}
