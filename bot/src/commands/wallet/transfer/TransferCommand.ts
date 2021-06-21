import { Message } from "node-telegram-bot-api";
import { Bot } from "../../../Bot";
import { BotReplyToMessageIdHandler } from "../../../handler";
import { translationKeys } from "../../../i18n";
import { IBotCommand } from "../../IBotCommand";

export class TransferCommand implements IBotCommand {
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
      const previousText = handler.storage.get("previousText");
      if (previousText && previousText === "transfer_command_reply_no_user_no_amount") {
        await this.handleRecipientReply(msg, handler);
      }

      if (previousText && previousText === "transfer_command_reply_username_pending_amount") {
        await this.handleAmountReply(msg, handler);
      }
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  async onText(msg: Message) {
    try {
      this.bot.replyWithMessageID(
        msg,
        translationKeys.transfer_command_reply_no_user_no_amount,
        this,
        {
          previousText: "transfer_command_reply_no_user_no_amount",
        },
        null,
        {
          disable_web_page_preview: true,
        }
      );
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private handleRecipientReply(msg: Message, handler: BotReplyToMessageIdHandler) {
    const username = msg.text.replace(/@/i, "");

    this.bot.replyWithMessageID(
      msg,
      translationKeys.transfer_command_reply_username_pending_amount,
      this,
      { previousText: "transfer_command_reply_username_pending_amount", username },
      null,
      {
        disable_web_page_preview: true,
      }
    );
  }

  private handleAmountReply(msg: Message, handler: BotReplyToMessageIdHandler) {
    const amount = msg.text.match(/^\d+(\.\d{1,2})?$/i);

    if (!Boolean(amount)) {
      return this.bot.replyWithMessageID(
        msg,
        translationKeys.transfer_command_reply_amount_error,
        this,
        null,
        null,
        null,
        {
          amount: msg.text,
        }
      );
    }

    const username = handler.storage.get("username");

    this.bot.clearCommandHandler(msg.chat.id);
    this.bot.reply(
      msg,
      translationKeys.transfer_command_reply_confirmation,
      { disable_web_page_preview: true },
      {
        amount: amount[0],
        username,
        currencyCode: "MXN", // @TODO get from wallet mcs
      }
    );
  }

  private handleErrorReply(error: Error, msg: Message) {
    return this.bot.reply(msg, translationKeys.start_command_error);
  }
}
