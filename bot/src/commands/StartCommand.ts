import { CreateUserRequest } from "@rapydbot/user/client";
import { Message } from "node-telegram-bot-api";
import { Bot } from "../Bot";
import { BotReplyToMessageIdHandler } from "../handler";
import { translationKeys } from "../i18n";
import { IBotCommand } from "./IBotCommand";

export class StartCommand implements IBotCommand {
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async onReplyFromMessageID(
    msg: Message,
    handler: BotReplyToMessageIdHandler,
    match?: RegExpMatchArray,
  ) {}

  async onText(msg: Message) {
    try {
      await this.findUserByTelegramUserIdOrCreateUser(msg);

      this.bot.replyWithTranslation(msg, translationKeys.start_command_intro, {
        disable_web_page_preview: true,
        reply_markup: {
          resize_keyboard: true,
          one_time_keyboard: true,
          keyboard: [
            [
              {
                text: this.bot.languageHandler.getTranslation(
                  msg,
                  translationKeys.command_text_createwallet,
                ),
              },
            ],
          ],
        },
      });
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

      this.bot.UserServiceClient.findUserByTelegramUserIdOrCreateUser(
        createUserRequest,
        (err, response) => {
          if (Boolean(err)) {
            return reject(err);
          }

          const user_id = response.getUserId();
          resolve();
          // @TODO create a wallet right away?
        },
      );
    });
  }

  private handleErrorReply(error: Error, msg: Message) {
    return this.bot.replyWithTranslation(msg, translationKeys.start_command_error);
  }
}
