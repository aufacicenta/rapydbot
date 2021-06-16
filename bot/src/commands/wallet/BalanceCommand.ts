import { GetWalletBalanceRequest } from "@rapydbot/wallet/client";
import { Message } from "node-telegram-bot-api";
import { Bot } from "../../Bot";
import { BotReplyToMessageIdHandler } from "../../handler";
import { translationKeys } from "../../i18n";
import { IBotCommand } from "../IBotCommand";
import { WalletServiceErrorCodes } from "@rapydbot/wallet/service/error";

import getUserId from "../util/getUserId";

export class BalanceCommand implements IBotCommand {
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
      this.handleBalanceReply(msg);
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private async handleBalanceReply(msg: Message) {
    const currentDate = this.bot.moment.format("YYYY-MM-DD HH:mm");
    const {
      currencyCode,
      currentBalance,
      onHoldBalance,
      reserveBalance,
      receivedBalance,
    } = await this.getWalletBalance(msg);

    this.bot.reply(msg, translationKeys.command_text_balance, null, {
      currentDate,
      currencyCode,
      currentBalance,
      onHoldBalance,
      reserveBalance,
      receivedBalance,
    });
  }

  private handleErrorReply(error: Error, msg: Message) {
    if (
      error?.message.includes(
        WalletServiceErrorCodes.rapyd_ewallet_does_not_have_balances
      )
    ) {
      return this.bot.reply(
        msg,
        translationKeys.walletbalance_command_error_ewallet_does_not_have_balances,
        {
          disable_web_page_preview: true,
        }
      );
    }
  }

  private async getWalletBalance(msg: Message): Promise<{
    currencyCode: string;
    currentBalance: number;
    onHoldBalance: number;
    reserveBalance: number;
    receivedBalance: number;
  }> {
    return new Promise((resolve, reject) => {
      getUserId(msg, this.bot.UserServiceClient)
        .then((userId) => {
          const getWalletBalanceRequest = new GetWalletBalanceRequest();
          getWalletBalanceRequest.setUserId(userId);

          this.bot.WalletServiceClient.getWalletBalance(
            getWalletBalanceRequest,
            (error, reply) => {
              if (Boolean(error)) {
                return reject(error);
              }

              const currencyCode = reply.getCurrencyCode();
              const currentBalance = reply.getBalance();
              const onHoldBalance = reply.getOnHoldBalance();
              const reserveBalance = reply.getReserveBalance();
              const receivedBalance = reply.getReceivedBalance();

              resolve({
                currencyCode,
                currentBalance,
                onHoldBalance,
                reserveBalance,
                receivedBalance,
              });
            }
          );
        })
        .catch((error) => reject(error));
    });
  }
}
