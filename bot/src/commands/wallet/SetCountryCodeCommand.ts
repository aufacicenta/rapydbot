import { SetWalletCountryCodeRequest } from "@rapydbot/wallet/client";
import { FindUserByTelegramUserIdRequest } from "@rapydbot/user/client";
import { Message } from "node-telegram-bot-api";
import { Bot } from "../../Bot";
import { BotReplyToMessageIdHandler } from "../../handler";
import { translationKeys } from "../../i18n";
import { IBotCommand } from "../IBotCommand";

export class SetCountryCodeCommand implements IBotCommand {
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async onReplyFromMessageID(
    msg: Message,
    handler: BotReplyToMessageIdHandler,
    match?: RegExpMatchArray
  ) {}

  async onText(msg: Message) {
    try {
      this.bot.reply(msg, translationKeys.command_text_set_country, {}, {});
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private handleErrorReply(error: Error, msg: Message) {
    return this.bot.reply(msg, translationKeys.start_command_error);
  }

  private async setWalletCountryCode(msg: Message): Promise<string> {
    return new Promise((resolve, reject) => {});
  }

  private async getUserId(msg: Message): Promise<string> {
    return new Promise((resolve, reject) => {
      const findUserRequestByTelegram = new FindUserByTelegramUserIdRequest();

      findUserRequestByTelegram.setTelegramFromUserId(msg.from.id);

      this.bot.UserServiceClient.findUserByTelegramUserId(
        findUserRequestByTelegram,
        (error, reply) => {
          if (Boolean(error)) {
            return reject(error);
          }

          const user_id = reply.getUserId();
          resolve(user_id);
        }
      );
    });
  }
}
