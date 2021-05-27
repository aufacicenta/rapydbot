import { Message } from "node-telegram-bot-api";
import { Bot } from "../Bot";
import { BotReplyToMessageIdHandler } from "../handler";
import { translationKeys } from "../i18n";
import { IBotCommand } from "./IBotCommand";

export class WalletCommand implements IBotCommand {
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

  onText(msg: Message) {
    try {
      if (/(create|crear)/i.test(msg.text)) {
        this.handleCreateOption(msg);
      } else {
        this.handleEmptyOptionMessage(msg);
      }
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private handleCreateOption(msg: Message) {
    // @TODO create a Rapyd e_wallet for the user and link the wallet address to the user ID
    // @TODO create a checkout page for the user. Can it be created without a specified amount?
    // @TODO if the user already has a wallet, should they create another one?
    try {
      this.bot.replyWithMessageID(
        msg,
        translationKeys.wallet_command_option_create,
        this,
        {},
        null,
        {
          disable_web_page_preview: true,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Top Up Wallet",
                  url: `https://sandboxcheckout.rapyd.net/?token=checkout_730765f5b6f816a832111150be267d70`,
                },
              ],
            ],
          },
        },
        {
          e_wallet_address: "ewallet_123",
          username: msg.chat.username,
          checkout_page_url: `https://sandboxcheckout.rapyd.net/?token=checkout_730765f5b6f816a832111150be267d70`,
        }
      );
    } catch (error) {}
  }

  private handleEmptyOptionMessage(msg: Message) {
    try {
      this.bot.reply(msg, translationKeys.wallet_command_empty_option, {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [
            [
              {
                text: this.bot.languageHandler.getTranslation(
                  msg,
                  translationKeys.wallet_command_option_text_balance
                ),
              },
              {
                text: this.bot.languageHandler.getTranslation(
                  msg,
                  translationKeys.wallet_command_option_text_create
                ),
              },
            ],
          ],
        },
      });
    } catch (error) {}
  }

  private handleErrorReply(error: Error, msg: Message) {
    return this.bot.reply(msg, translationKeys.start_command_error);
  }
}
