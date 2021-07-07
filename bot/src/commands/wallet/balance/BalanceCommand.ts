import { GetWalletBalanceRequest } from "@rapydbot/wallet/client";
import { WalletServiceErrorCodes } from "@rapydbot/wallet/service/error";
import { Message } from "node-telegram-bot-api";
import { Bot } from "../../../Bot";
import { BotReplyToMessageIdHandler } from "../../../handler";
import { translationKeys } from "../../../i18n";
import { IBotCommand } from "../../IBotCommand";
import getUserId from "../../util/getUserId";
import { BalanceReplyProps } from "./types";

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
      await this.handleBalanceReply(msg);
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private async handleBalanceReply(msg: Message) {
    const balance = await this.getWalletBalance(msg);

    this.bot.reply(msg, translationKeys.balance_command_reply, null, {
      currentDate: this.getBalanceDate(),
      ...balance,
    });
  }

  public async replyToPaymentCompleteWebhook({
    msg,
    userId,
  }: {
    msg: string;
    userId: string;
  }) {
    const balance = await this.getBalance(userId);

    this.bot.reply(
      JSON.parse(msg),
      translationKeys.balance_command_reply,
      null,
      {
        currentDate: this.getBalanceDate(),
        currencyCode: balance.currencyCode,
        onHoldBalance: String(balance.onHoldBalance).padStart(10, " "),
        reserveBalance: String(balance.reserveBalance).padStart(10, " "),
        receivedBalance: String(balance.receivedBalance).padStart(10, " "),
        currentBalance: String(balance.currentBalance).padStart(10, " "),
      }
    );
  }

  private getBalanceDate(): string {
    return this.bot.moment.format("MMM DD, YYYY");
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

  private async getBalance(userId: string): Promise<BalanceReplyProps> {
    return new Promise((resolve, reject) => {
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
    });
  }

  private async getWalletBalance(msg: Message): Promise<BalanceReplyProps> {
    return new Promise((resolve, reject) => {
      getUserId(msg, this.bot.UserServiceClient)
        .then(async (userId) => {
          try {
            resolve(await this.getBalance(userId));
          } catch (error) {
            reject(error);
          }
        })
        .catch((error) => reject(error));
    });
  }
}
