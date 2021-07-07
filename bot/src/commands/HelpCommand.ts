import { Message } from "node-telegram-bot-api";
import { Bot } from "../Bot";
import { BotReplyToMessageIdHandler } from "../handler";
import { translationKeys } from "../i18n";
import { IBotCommand } from "./IBotCommand";
import { getCommandButtons } from "./util/buttons/commands";

export class HelpCommand implements IBotCommand {
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
      const commandButtonsString = this.bot.languageHandler.getTranslation(
        msg,
        translationKeys.help_command_buttons,
        null
      );

      this.bot.reply(msg, translationKeys.help_command_reply, {
        disable_web_page_preview: true,
        reply_markup: {
          keyboard: getCommandButtons({ commandButtonsString }),
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
