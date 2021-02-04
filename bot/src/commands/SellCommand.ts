import { CreateOrderRequest } from "@aufax/order/client";
import { GetPriceRequest } from "@aufax/price/client";
import { Price_ServiceErrorCodes } from "@aufax/price/service/error";
import { CreateUserRequest } from "@aufax/user/client";
import moment from "moment";
import { Message } from "node-telegram-bot-api";
import { AufaXBot } from "../AufaXBot";
import { BotReplyToMessageIdHandler } from "../handler";
import { translationKeys } from "../i18n";
import { IBotCommand } from "./IBotCommand";
import regexp from "./util/regexp";
import validation from "./util/validation";

export class SellCommand implements IBotCommand {
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
          .getTranslation(msg, translationKeys.sell_command_request_amount)
          .trim()
      ) {
        return await this.replyToAmountRequest(msg, handler);
      }

      if (
        replyToMessageText.trim() ===
        this.bot
          .getTranslation(msg, translationKeys.sell_command_request_currency)
          .trim()
      ) {
        return await this.replyToCurrencyRequest(msg, handler);
      }

      // TODO handle empty response
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  async onText(msg: Message, match?: RegExpMatchArray) {
    try {
      const text = msg.text;

      const amountAndCurrency = regexp.getAmountAndCurrency(text);

      if (!Boolean(amountAndCurrency)) {
        return this.bot.replyWithMessageID(
          msg,
          translationKeys.sell_command_request_amount,
          this
        );
      }

      const amount = amountAndCurrency.groups.amount;

      if (!validation.isValidAmount(amount)) {
        return this.bot.reply(
          msg,
          translationKeys.sell_command_invalid_currency
        );
      }

      const currency = amountAndCurrency.groups.currency;

      if (!validation.isValidCurrency(currency)) {
        return this.bot.replyWithMessageID(
          msg,
          translationKeys.sell_command_request_currency,
          this,
          { amount }
        );
      }

      if (!regexp.isCurrencyPair(currency)) {
        return await this.createSellOrder(msg, amount, currency);
      }

      const currency_pair = regexp.getCurrencyPair(currency);

      const from_currency = currency_pair.groups.from_currency;
      const to_currency = currency_pair.groups.to_currency;

      await this.createSellOrder(msg, amount, from_currency, to_currency);
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  async createSellOrder(
    msg: Message,
    amount: string,
    from_currency: string,
    to_currency?: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const createUserRequest = new CreateUserRequest();

      createUserRequest.setTelegramFromUserId(msg.from.id);
      createUserRequest.setTelegramUsername(msg.from.username);

      if (msg.chat.type === "private") {
        createUserRequest.setTelegramPrivateChatId(msg.chat.id);
      }

      this.bot.UserServiceClient.findUserByTelegramUserIdOrCreateUser(
        createUserRequest,
        (err, response) => {
          if (Boolean(err)) {
            return reject(err);
          }

          const user_id = response.getUserId();

          const getPriceRequest = new GetPriceRequest();

          getPriceRequest.setFromCurrency(from_currency);
          getPriceRequest.setToCurrency(to_currency);

          this.bot.PriceServiceClient.getPrice(
            getPriceRequest,
            (err, response) => {
              if (Boolean(err)) {
                return reject(err);
              }

              const price_id = response.getPriceId();
              const price = response.getPrice();
              const convertToSymbol = response.getToCurrency();

              const createTransactionRequest = new CreateOrderRequest();

              createTransactionRequest.setUserId(user_id);
              createTransactionRequest.setPriceId(price_id);
              createTransactionRequest.setAmount(Number(amount.trim()));
              createTransactionRequest.setFromCurrency(from_currency);
              createTransactionRequest.setToCurrency(to_currency);

              this.bot.OrderServiceClient.createSellOrder(
                createTransactionRequest,
                (err, response) => {
                  if (Boolean(err)) {
                    return reject(err);
                  }

                  const transaction_id = response.getTransactionId();
                  const expires_at = response.getExpiresAt();

                  if (!Boolean(transaction_id)) {
                    return reject();
                  }

                  this.bot.reply(
                    msg,
                    translationKeys.sell_command_create_tx_success,
                    { disable_web_page_preview: true },
                    {
                      amount,
                      currency: from_currency,
                      price: `${convertToSymbol} ${price.toFixed(2)}`,
                      price_source: `<a href="https://coinmarketcap.com/">coinmarketcap.com</a>`, // TODO let the user set a pricing source
                      expires_at: moment(expires_at)
                        .locale(msg.from.language_code)
                        .fromNow(),
                    }
                  );

                  resolve();
                }
              );
            }
          );
        }
      );
    });
  }

  private handleErrorReply(error: Error, msg: Message) {
    if (error?.message.includes(Price_ServiceErrorCodes.invalid_symbol)) {
      return this.bot.reply(msg, translationKeys.sell_command_invalid_currency);
    }

    return this.bot.reply(msg, translationKeys.sell_command_create_tx_error);
  }

  private replyToAmountRequest(
    msg: Message,
    handler: BotReplyToMessageIdHandler
  ) {
    const text = msg.text;

    const amount = regexp.getAmount(text).groups.amount;

    if (!validation.isValidAmount(amount)) {
      handler.selfDestruct();
      return this.bot.reply(msg, translationKeys.sell_command_invalid_amount);
    }

    handler.storage.set("amount", amount);

    return this.bot.replyWithMessageID(
      msg,
      translationKeys.sell_command_request_currency,
      this
    );
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
      return this.bot.reply(msg, translationKeys.sell_command_invalid_currency);
    }

    handler.selfDestruct();

    if (!regexp.isCurrencyPair(currency)) {
      return await this.createSellOrder(msg, amount, currency);
    }

    const currency_pair = regexp.getCurrencyPair(currency);

    const from_currency = currency_pair.groups.from_currency;
    const to_currency = currency_pair.groups.to_currency;

    await this.createSellOrder(msg, amount, from_currency, to_currency);
  }
}
