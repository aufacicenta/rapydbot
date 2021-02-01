import { CreateTransactionRequest } from "@aufax/transaction/client";
import { CreateUserRequest } from "@aufax/user/client";
import moment from "moment";
import { Message } from "node-telegram-bot-api";
import { AufaXBot } from "../AufaXBot";
import { translationKeys } from "../i18n";
import { IBotCommand } from "./IBotCommand";

export class SellCommand implements IBotCommand {
  private bot: AufaXBot;

  constructor(bot: AufaXBot) {
    this.bot = bot;
  }

  async onReplyFromMessageID(msg: Message, match?: RegExpMatchArray) {
    const replyToMessageText = msg.reply_to_message.text;
    const text = msg.text;

    if (
      replyToMessageText.trim() ===
      this.bot
        .getTranslation(msg, translationKeys.sell_command_request_amount)
        .trim()
    ) {
      // TODO handle amount
      // TODO move sell commmand regexp utils to shared commands util, it will be used between sell and buy commands
    }
  }

  async onText(msg: Message, match?: RegExpMatchArray) {
    const text = msg.text;

    const result = /(?<amount>\d+\.?\d*|\.\d+$)(?<currency>\b.*\b)/i.exec(text);

    if (!Boolean(result)) {
      return this.bot.replyWithMessageID(
        msg,
        translationKeys.sell_command_request_amount,
        msg.message_id,
        this
      );
    }

    const amount = result.groups.amount;

    if (!Boolean(amount) || amount.length === 0) {
      return this.bot.reply(msg, translationKeys.sell_command_invalid_currency);
    }

    const currency = result.groups.currency;

    if (!Boolean(currency) || currency.length === 0) {
      return this.bot.reply(msg, translationKeys.sell_command_invalid_currency);
    }

    const isCurrencyPair = /\/{1}/i.test(currency);

    if (!isCurrencyPair) {
      return await this.createTransaction(msg, amount, currency);
    }

    const currency_pair = /(?<from_currency>\w+)\/(?<to_currency>\w+)/i.exec(
      currency
    );
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
