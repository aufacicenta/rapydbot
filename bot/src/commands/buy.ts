import { Message } from "node-telegram-bot-api";
import { AufaXBot } from "../AufaXBot";
import { BotReplyToMessageIdHandler } from "../handler";
import { translationKeys } from "../i18n";
import { IBotCommand } from "./IBotCommand";
import regexp from "./util/regexp";
import validation from "./util/validation";

export class BuyCommand implements IBotCommand {
  private bot: AufaXBot;

  constructor(bot: AufaXBot) {
    this.bot = bot;
  }

  async onReplyFromMessageID(
    msg: Message,
    handler: BotReplyToMessageIdHandler,
    match?: RegExpMatchArray
  ) {}

  async onText(msg: Message) {
    const text = msg.text;

    const amountAndCurrency = regexp.getAmountAndCurrency(text);

    if (!Boolean(amountAndCurrency)) {
      return this.bot.replyWithMessageID(
        msg,
        translationKeys.buy_command_request_amount,
        this
      );
    }

    const amount = amountAndCurrency.groups.amount;

    if (!validation.isValidAmount(amount)) {
      return this.bot.reply(msg, translationKeys.buy_command_invalid_currency);
    }

    const currency = amountAndCurrency.groups.currency;

    if (!validation.isValidCurrency(currency)) {
      return this.bot.replyWithMessageID(
        msg,
        translationKeys.buy_command_request_currency,
        this
      );
    }

    await this.getSellers(msg, amount, currency);
  }

  getSellers(msg: Message, amount: string, currency: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.bot.reply(msg, translationKeys.buy_command_sellers_list);

      resolve();
    });
  }
}
