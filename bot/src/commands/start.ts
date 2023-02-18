import { CreateUserRequest } from "@rapydbot/user/client";
import { Message } from "node-telegram-bot-api";

import { Bot } from "../Bot";
import { translationKeys } from "../i18n";

import { IBotCommand } from "./IBotCommand";

export class StartCommand implements IBotCommand {
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async onText(msg: Message) {
    try {
      await this.findUserByTelegramUserIdOrCreateUser(msg);
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private async findUserByTelegramUserIdOrCreateUser(msg: Message): Promise<void> {
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

  private handleErrorReply(error: Error, msg: Message) {
    return this.bot.replyWithTranslation(msg, translationKeys.start_command_error);
  }
}
