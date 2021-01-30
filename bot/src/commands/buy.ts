import { Message } from "node-telegram-bot-api";
import { AufaXBot } from "../AufaXBot";
import { translationKeys } from "../i18n";
import { IBotCommand } from "./IBotCommand";

export class BuyCommand implements IBotCommand {
  private bot: AufaXBot;

  constructor(bot: AufaXBot) {
    this.bot = bot;
  }

  async onText(msg: Message, match?: RegExpMatchArray) {
    const text = msg.text;

    const currency = /\bbtc|eth\b/i.exec(text);

    if (!Boolean(currency) || currency.length === 0) {
      return this.bot.reply(msg, translationKeys.buy_command_invalid_currency);
    }

    const amount = /(\d+\.?\d*|\.\d+)$/i.exec(text);

    if (!Boolean(amount) || amount.length === 0) {
      return this.bot.reply(msg, translationKeys.buy_command_invalid_amount);
    }

    await this.getTransactionBreakdown(msg, currency[0], amount[0]);
  }

  getTransactionBreakdown(
    msg: Message,
    currency: string,
    amount: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.bot.reply(
        msg,
        translationKeys.buy_command_tx_breakdown,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: this.bot.getTranslation(
                    msg,
                    translationKeys.buy_command_inline_markup_text_attach_purchase_bank_note
                  ),
                  callback_data: `/internal:attach_purchase_bank_note`,
                },
              ],
            ],
          },
        },
        {
          currency_pair: "USD/BTC",
          price: "USD 33,825.00",
          exchange_rate_amount: "7.5",
          exchange_rate_currency: "USD",
          exchange_rate_result: "GTQ 123.45",
          fee: "5%",
          fee_result: "GTQ 10.23",
          total_result: "GTQ 112.02",
          bank_name: "BAC, SA",
          bank_account_number: "40-123456-78",
          bank_account_type: "MONETARIA",
          beneficiary: "Apellido, Nombre",
        }
      );

      resolve();
    });
  }
}
