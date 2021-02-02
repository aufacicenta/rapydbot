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
  ) {
    try {
      const replyToMessageText = msg.reply_to_message.text;

      if (
        replyToMessageText.trim() ===
        this.bot
          .getTranslation(msg, translationKeys.buy_command_request_amount)
          .trim()
      ) {
        return this.replyToAmountRequest(msg, handler);
      }

      if (
        replyToMessageText.trim() ===
        this.bot
          .getTranslation(msg, translationKeys.buy_command_request_currency)
          .trim()
      ) {
        return this.replyToCurrencyRequest(msg, handler);
      }
    } catch (error) {
      console.error(error);
      this.bot.reply(msg, translationKeys.buy_command_get_sell_orders_error);
    }
  }

  async onText(msg: Message) {
    try {
      const text = msg.text.replace(/\/buy\s?/i, "");

      const amountRegexArray = regexp.getAmount(text);
      const currencyPairRegexArray = regexp.getCurrencyPair(text);

      if (!Boolean(amountRegexArray) && !Boolean(currencyPairRegexArray)) {
        return this.bot.replyWithMessageID(
          msg,
          translationKeys.buy_command_request_amount,
          this
        );
      }

      const amount = amountRegexArray?.groups?.amount;
      const from_currency = currencyPairRegexArray?.groups?.from_currency;
      const to_currency = currencyPairRegexArray?.groups?.to_currency;

      if (!validation.isValidAmount(amount)) {
        return this.bot.replyWithMessageID(
          msg,
          translationKeys.buy_command_request_amount,
          this,
          { from_currency, to_currency }
        );
      }

      if (!validation.isValidCurrency(from_currency)) {
        return this.bot.replyWithMessageID(
          msg,
          translationKeys.buy_command_request_currency,
          this,
          { amount }
        );
      }

      if (
        validation.isValidCurrency(from_currency) &&
        validation.isValidCurrency(to_currency)
      ) {
        return await this.getSellOrders(
          msg,
          amount,
          from_currency,
          to_currency
        );
      }

      await this.getSellOrders(msg, amount, from_currency);
    } catch (error) {
      console.error(error);
      this.bot.reply(msg, translationKeys.buy_command_get_sell_orders_error);
    }
  }

  private async getSellOrders(
    msg: Message,
    amount: string,
    from_currency: string,
    to_currency?: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.bot.reply(msg, translationKeys.buy_command_sell_orders);

      resolve();
    });
  }

  private async replyToAmountRequest(
    msg: Message,
    handler: BotReplyToMessageIdHandler
  ) {
    const text = msg.text;

    const amount = regexp.getAmount(text)?.groups?.amount;

    if (!validation.isValidAmount(amount)) {
      handler.selfDestruct();
      return this.bot.reply(msg, translationKeys.buy_command_invalid_amount);
    }

    const from_currency = handler.storage.get("from_currency");
    const to_currency = handler.storage.get("to_currency");

    if (
      !validation.isValidCurrency(from_currency) &&
      !validation.isValidCurrency(to_currency)
    ) {
      handler.storage.set("amount", amount);

      return this.bot.replyWithMessageID(
        msg,
        translationKeys.buy_command_request_currency,
        this
      );
    }

    if (
      validation.isValidCurrency(from_currency) &&
      !validation.isValidCurrency(to_currency)
    ) {
      handler.selfDestruct();
      return await this.getSellOrders(msg, amount, from_currency);
    }

    handler.selfDestruct();
    await this.getSellOrders(msg, amount, from_currency, to_currency);
  }

  private async replyToCurrencyRequest(
    msg: Message,
    handler: BotReplyToMessageIdHandler
  ) {
    const text = msg.text;

    const amount = handler.storage.get("amount");
    const currency = text.trim();

    if (
      !validation.isValidAmount(amount) ||
      !validation.isValidCurrency(currency)
    ) {
      handler.selfDestruct();
      return this.bot.reply(msg, translationKeys.buy_command_invalid_currency);
    }

    handler.selfDestruct();

    if (!regexp.isCurrencyPair(currency)) {
      return await this.getSellOrders(msg, amount, currency);
    }

    const currency_pair = regexp.getCurrencyPair(currency);

    const from_currency = currency_pair?.groups?.from_currency;
    const to_currency = currency_pair?.groups?.to_currency;

    await this.getSellOrders(msg, amount, from_currency, to_currency);
  }
}
