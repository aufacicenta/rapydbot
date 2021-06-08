import { GetWalletCountryCodeRequest } from "@rapydbot/wallet/client";
import { Message } from "node-telegram-bot-api";
import { Bot } from "../../Bot";
import { BotReplyToMessageIdHandler } from "../../handler";
import { translationKeys } from "../../i18n";
import { IBotCommand } from "../IBotCommand";

export class BalanceCommand implements IBotCommand {
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
      this.bot.reply(msg, translationKeys.start_command_intro, {
        disable_web_page_preview: true,
        reply_markup: {
          resize_keyboard: true,
          one_time_keyboard: true,
          keyboard: [
            [
              {
                text: this.bot.languageHandler.getTranslation(
                  msg,
                  translationKeys.command_text_createwallet
                ),
              },
              {
                text: this.bot.languageHandler.getTranslation(
                  msg,
                  translationKeys.command_text_topup
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

  private handleErrorReply(error: Error, msg: Message) {
    return this.bot.reply(msg, translationKeys.start_command_error);
  }
}
