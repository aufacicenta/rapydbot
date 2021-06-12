import { Message } from "node-telegram-bot-api";
import { Bot } from "../Bot";
import { BotReplyToMessageIdHandler } from "../handler";
import { translationKeys } from "../i18n";
import { IBotCommand } from "./IBotCommand";
import { getCountryButtons } from "./util/countries";

export class TopUpCommand implements IBotCommand {
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async onReplyFromMessageID(
    msg: Message,
    handler: BotReplyToMessageIdHandler,
    match?: RegExpMatchArray
  ) {
    try {
      const replyToMessageText = msg.reply_to_message.text;
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  async onText(msg: Message) {
    try {
      const countryButtons = getCountryButtons();

      this.bot.replyWithMessageID(
        msg,
        translationKeys.topup_command_country_reply,
        this,
        {
          previousText: "/topup",
        },
        null,
        {
          disable_web_page_preview: true,
          reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: [...countryButtons],
          },
        }
      );
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private handleErrorReply(error: Error, msg: Message) {
    return this.bot.reply(msg, translationKeys.start_command_error);
  }
}
