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
    match?: RegExpMatchArray
  ) {}

  onText(msg: Message) {
    try {
      this.bot.reply(msg, translationKeys.start_command_intro, {
        disable_web_page_preview: true,
        reply_markup: {
          keyboard: [
            [
              {
                text: this.bot.languageHandler.getTranslation(
                  msg,
                  translationKeys.command_text_wallet
                ),
              },
              {
                text: this.bot.languageHandler.getTranslation(
                  msg,
                  translationKeys.command_text_request
                ),
              },
              {
                text: this.bot.languageHandler.getTranslation(
                  msg,
                  translationKeys.command_text_send
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
