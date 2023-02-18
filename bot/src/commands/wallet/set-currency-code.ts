import { Message } from "node-telegram-bot-api";
import { SetWalletCurrencyCodeRequest } from "@rapydbot/wallet/client";
import { Bot } from "../../Bot";
import { BotReplyToMessageIdHandler } from "../../handler";
import { translationKeys } from "../../i18n";
import { IBotCommand } from "../IBotCommand";
import { getCurrencyButtons, getCurrencyCode } from "../util/buttons/currencies";
import getUserId from "../util/getUserId";

export class SetCurrencyCodeCommand implements IBotCommand {
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async onReplyFromMessageID(
    msg: Message,
    handler: BotReplyToMessageIdHandler,
    match?: RegExpMatchArray,
  ) {
    try {
      const previousText = handler.storage.get("previousText");
      if (previousText && previousText === "/setcurrency") {
        await this.handleCurrencyChangeReply(msg);
      }
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  async onText(msg: Message) {
    try {
      this.bot.replyWithMessageID(
        msg,
        translationKeys.setcountry_command_reply,
        this,
        {
          previousText: "/setcurrency",
        },
        null,
        {
          disable_web_page_preview: true,
          reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: getCurrencyButtons(),
          },
        },
      );
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private handleErrorReply(error: Error, msg: Message) {
    return this.bot.replyWithTranslation(msg, translationKeys.start_command_error);
  }

  private async handleCurrencyChangeReply(msg: Message) {
    const newCurrency = getCurrencyCode(msg.text);
    const userId = await getUserId(msg, this.bot.clients.user);

    const currencyCode = await this.setWalletCurrencyCode(msg, {
      userId,
      currencyCode: newCurrency,
    });

    this.bot.replyWithTranslation(
      msg,
      translationKeys.setcurrency_command_on_currency_change_reply,
      {
        disable_web_page_preview: true,
      },
      {
        currencyCode,
      },
    );
  }

  private async setWalletCurrencyCode(
    msg: Message,
    { userId, currencyCode }: { userId: string; currencyCode: string },
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const request = new SetWalletCurrencyCodeRequest();
      request.setUserId(userId);
      request.setCurrencyCode(currencyCode);

      this.bot.clients.wallet.setWalletCurrencyCode(request, (error, reply) => {
        if (Boolean(error)) {
          return reject(error);
        }

        const currencyCode = reply.getCurrencyCode();
        resolve(currencyCode);
      });
    });
  }
}
