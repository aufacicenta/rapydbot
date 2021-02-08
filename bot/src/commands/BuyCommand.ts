import {
  CreateOrderRequest,
  GetSellOrdersReply,
  GetSellOrdersRequest,
} from "@aufax/order/client";
import { GetPriceRequest } from "@aufax/price/client";
import { Price_ServiceErrorCodes } from "@aufax/price/service/error";
import { CreateUserRequest } from "@aufax/user/client";
import { Message } from "node-telegram-bot-api";
import { AufaXBot } from "../AufaXBot";
import { BotReplyToMessageIdHandler } from "../handler";
import { translationKeys } from "../i18n";
import { IBotCommand } from "./IBotCommand";
import regexp from "./util/regexp";
import validation from "./util/validation";

const amountFormatter = Intl.NumberFormat("en-US", {
  minimumFractionDigits: 5,
});

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
        this.bot.getTranslation(msg, translationKeys.buy_command_request_amount).trim()
      ) {
        return this.replyToAmountRequest(msg, handler);
      }

      if (
        replyToMessageText.trim() ===
        this.bot.getTranslation(msg, translationKeys.buy_command_request_currency).trim()
      ) {
        return this.replyToCurrencyRequest(msg, handler);
      }
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  async onText(msg: Message) {
    try {
      const text = msg.text.replace(/^\/(buy|comprar)\s?/i, "");

      const amountRegexArray = regexp.getAmount(text);
      const currencyPairRegexArray = regexp.getCurrencyPair(text);

      if (!Boolean(amountRegexArray) && !Boolean(currencyPairRegexArray)) {
        return this.bot.replyWithMessageID(msg, translationKeys.buy_command_request_amount, this);
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

      if (validation.isValidCurrency(from_currency) && validation.isValidCurrency(to_currency)) {
        return await this.getSellOrders(msg, amount, from_currency, to_currency);
      }

      await this.getSellOrders(msg, amount, from_currency);
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private async getSellOrders(
    msg: Message,
    amount: string,
    from_currency: string,
    to_currency?: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const createUserRequest = new CreateUserRequest();

      createUserRequest.setTelegramFromUserId(msg.from.id);
      createUserRequest.setTelegramUsername(msg.from.username);
      createUserRequest.setTelegramPrivateChatId(msg.chat.id);

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

          this.bot.PriceServiceClient.getPrice(getPriceRequest, (err, response) => {
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

            this.bot.OrderServiceClient.createBuyOrder(
              createTransactionRequest,
              (err, response) => {
                if (Boolean(err)) {
                  return reject(err);
                }

                const transaction_id = response.getTransactionId();

                if (!Boolean(transaction_id)) {
                  return reject();
                }

                const getSellOrdersRequest = new GetSellOrdersRequest();
                getSellOrdersRequest.setAmount(Number(amount));
                getSellOrdersRequest.setFromCurrency(from_currency);
                getSellOrdersRequest.setToCurrency(to_currency);

                const sell_orders: Array<GetSellOrdersReply.AsObject> = [];

                const call = this.bot.OrderServiceClient.getSellOrders(getSellOrdersRequest);

                call.on("data", (data: GetSellOrdersReply) => {
                  sell_orders.push(data.toObject());
                });

                call.on("end", () => {
                  const priceContent = {
                    price: `${convertToSymbol} ${price}`,
                    price_source: `<a href="https://coinmarketcap.com/?ref=@aufaxbot">coinmarketcap.com</a>`, // TODO let the user set a pricing source
                  };

                  if (sell_orders.length <= 0) {
                    this.bot.reply(
                      msg,
                      translationKeys.buy_command_empty_sell_orders,
                      { disable_web_page_preview: true },
                      {
                        ...priceContent,
                      }
                    );
                    resolve();
                    return;
                  }

                  const sell_orders_formatted = this.getSellOrdersFormatted(sell_orders);

                  this.bot.reply(
                    msg,
                    translationKeys.buy_command_sell_orders,
                    { disable_web_page_preview: true },
                    {
                      sell_orders_formatted,
                      ...priceContent,
                    }
                  );

                  resolve();
                });
              }
            );
          });
        }
      );
    });
  }

  private getSellOrdersFormatted(orders: Array<GetSellOrdersReply.AsObject>): string {
    let result = "";
    for (const order of orders) {
      result += this.formatSellOrder(order);
    }

    return result;
  }

  private formatSellOrder(order: GetSellOrdersReply.AsObject): string {
    return `@${order.telegramUsername}
${amountFormatter.format(order.amount)} ${order.fromCurrency}${
      Boolean(order.toCurrency) ? "/" + order.toCurrency : ""
    }

`;
  }

  private async replyToAmountRequest(msg: Message, handler: BotReplyToMessageIdHandler) {
    const text = msg.text;

    const amount = regexp.getAmount(text)?.groups?.amount;

    if (!validation.isValidAmount(amount)) {
      handler.selfDestruct();
      return this.bot.reply(msg, translationKeys.buy_command_invalid_amount);
    }

    const from_currency = handler.storage.get("from_currency");
    const to_currency = handler.storage.get("to_currency");

    if (!validation.isValidCurrency(from_currency) && !validation.isValidCurrency(to_currency)) {
      handler.storage.set("amount", amount);

      return this.bot.replyWithMessageID(msg, translationKeys.buy_command_request_currency, this);
    }

    if (validation.isValidCurrency(from_currency) && !validation.isValidCurrency(to_currency)) {
      handler.selfDestruct();
      return await this.getSellOrders(msg, amount, from_currency);
    }

    handler.selfDestruct();
    await this.getSellOrders(msg, amount, from_currency, to_currency);
  }

  private async replyToCurrencyRequest(msg: Message, handler: BotReplyToMessageIdHandler) {
    const text = msg.text;

    const amount = handler.storage.get("amount");
    const currency = text.trim();

    if (!validation.isValidAmount(amount) || !validation.isValidCurrency(currency)) {
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

  private handleErrorReply(error: Error, msg: Message) {
    if (error?.message.includes(Price_ServiceErrorCodes.invalid_symbol)) {
      return this.bot.reply(msg, translationKeys.buy_command_invalid_currency);
    }

    return this.bot.reply(msg, translationKeys.buy_command_get_sell_orders_error);
  }
}
