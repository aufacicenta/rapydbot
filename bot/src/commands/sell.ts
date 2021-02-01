import { CreateTransactionRequest } from "@aufax/transaction/client";
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
    const replyToMessageText = msg.reply_to_message.text;
    const text = msg.text;

    if (
      replyToMessageText.trim() ===
      this.bot
        .getTranslation(msg, translationKeys.sell_command_request_amount)
        .trim()
    ) {
      const amountAndCurrency = regexp.getAmountAndCurrency(text);

      if (!Boolean(amountAndCurrency)) {
        handler.selfDestruct();
        return this.bot.reply(msg, translationKeys.sell_command_invalid_amount);
      }

      const amount = amountAndCurrency.groups.amount;

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

    if (
      replyToMessageText.trim() ===
      this.bot
        .getTranslation(msg, translationKeys.sell_command_request_currency)
        .trim()
    ) {
      const amount = handler.storage.get("amount");
      const currency = text.trim();

      if (
        !validation.isValidAmount(amount) ||
        !validation.isValidCurrency(currency)
      ) {
        handler.selfDestruct();
        return this.bot.reply(
          msg,
          translationKeys.sell_command_invalid_currency
        );
      }

      handler.storage.set("currency", currency);
      handler.selfDestruct();

      await this.createTransaction(msg, amount, currency);
    }

    // TODO handle empty response
  }

  async onText(msg: Message, match?: RegExpMatchArray) {
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
      return this.bot.reply(msg, translationKeys.sell_command_invalid_currency);
    }

    const currency = amountAndCurrency.groups.currency;

    if (!validation.isValidCurrency(currency)) {
      return this.bot.replyWithMessageID(
        msg,
        translationKeys.sell_command_request_currency,
        this
      );
    }

    if (!regexp.isCurrencyPair(currency)) {
      return await this.createTransaction(msg, amount, currency);
    }

    const currency_pair = regexp.getCurrencyPair(currency);

    const from_currency = currency_pair.groups.from_currency;
    const to_currency = currency_pair.groups.to_currency;

    await this.createTransaction(msg, amount, from_currency, to_currency);
  }

  async createTransaction(
    msg: Message,
    amount: string,
    from_currency: string,
    to_currency?: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const createUserRequest = new CreateUserRequest();

      createUserRequest.setTelegramUserId(msg.from.id);

      this.bot.UserServiceClient.findUserByTelegramUserIdOrCreateUser(
        createUserRequest,
        (err, response) => {
          if (Boolean(err)) {
            reject(err);
          }

          const user_id = response.getId();

          const createTransactionRequest = new CreateTransactionRequest();

          createTransactionRequest.setUserId(user_id);
          createTransactionRequest.setAmount(Number(amount.trim()));
          createTransactionRequest.setFromCurrency(from_currency);
          createTransactionRequest.setToCurrency(to_currency);

          this.bot.TransactionServiceClient.createTransaction(
            createTransactionRequest,
            (err, response) => {
              if (Boolean(err)) {
                reject(err);
              }

              const transaction_id = response.getTransactionId();
              const expires_at = response.getExpiresAt();

              if (!Boolean(transaction_id)) {
                reject();
              }

              this.bot.reply(
                msg,
                translationKeys.sell_command_create_tx_success,
                {},
                {
                  amount,
                  currency: from_currency,
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
    });
  }
}
