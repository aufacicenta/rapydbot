import { CreateUserRequest } from "@rapydbot/user/client";

import { Bot } from "../Bot";
import { translationKeys } from "../i18n";
import { CustomMessage } from "../types";

import { IBotCommand } from "./types";

export class StartCommand implements IBotCommand {
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async onText(msg: CustomMessage) {
    try {
      await this.findUserByTelegramUserIdOrCreateUser(msg);
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private async findUserByTelegramUserIdOrCreateUser(msg: CustomMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      const createUserRequest = new CreateUserRequest();

      createUserRequest.setTelegramFromUserId(msg.from.id);
      createUserRequest.setTelegramUsername(msg.from.username);

      if (msg.chat.type === "private") {
        createUserRequest.setTelegramPrivateChatId(msg.chat.id);
      }

      this.bot.clients.user.findUserByTelegramUserIdOrCreateUser(
        createUserRequest,
        (err, _reply) => {
          if (Boolean(err)) {
            return reject(err);
          }

          resolve();
        },
      );
    });
  }

  private handleErrorReply(error: Error, msg: CustomMessage) {
    return this.bot.replyWithTranslation(msg, translationKeys.start_command_error);
  }
}
