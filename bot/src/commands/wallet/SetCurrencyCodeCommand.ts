import { Message } from "node-telegram-bot-api";
import { SetWalletCurrencyCodeRequest } from "../../../../wallet/build/client";
import { Bot } from "../../Bot";
import { BotReplyToMessageIdHandler } from "../../handler";
import { translationKeys } from "../../i18n";
import { IBotCommand } from "../IBotCommand";
import { getCurrencyButtons } from "../util/currencies";
import getUserId from "../util/getUserId";

export class SetCurrencyCodeCommand implements IBotCommand {
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
      this.bot.reply(msg, translationKeys.setcurrency_command_reply, {
        disable_web_page_preview: true,
        reply_markup: {
          resize_keyboard: true,
          one_time_keyboard: true,
          keyboard: getCurrencyButtons(),
        },
      });
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private handleErrorReply(error: Error, msg: Message) {
    return this.bot.reply(msg, translationKeys.start_command_error);
  }

  private async setWalletCurrencyCode(msg: Message): Promise<string> {
    return new Promise((resolve, reject) => {
      getUserId(msg, this.bot.UserServiceClient)
        .then((userId) => {
          const setWalletCurrencyCodeRequest = new SetWalletCurrencyCodeRequest();
          setWalletCurrencyCodeRequest.setUserId(userId);
          setWalletCurrencyCodeRequest.setCurrencyCode(msg.text);

          this.bot.WalletServiceClient.setWalletCurrencyCode(
            setWalletCurrencyCodeRequest,
            (error, reply) => {
              if (Boolean(error)) {
                return reject(error);
              }

              const currencyCode = reply.getCurrencyCode();
              resolve(currencyCode);
            }
          );
        })
        .catch((error) => reject(error));
    });
  }
}
