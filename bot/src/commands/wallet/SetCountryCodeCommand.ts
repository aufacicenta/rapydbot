import { Message } from "node-telegram-bot-api";
import { Bot } from "../../Bot";
import { BotReplyToMessageIdHandler } from "../../handler";
import { translationKeys } from "../../i18n";
import { IBotCommand } from "../IBotCommand";
import { FindUserByTelegramUserIdRequest } from "../../../../user/build/client";

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
}
