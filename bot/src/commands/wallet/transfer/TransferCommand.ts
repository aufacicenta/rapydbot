import { GetUserIdByTelegramUsernameRequest } from "@rapydbot/user/client";
import { UserServiceErrorCodes } from "@rapydbot/user/service/error";
import { Message } from "node-telegram-bot-api";
import {
  TransferFromWalletReply,
  TransferFromWalletRequest,
} from "../../../../../wallet/build/client";
import { Bot } from "../../../Bot";
import { BotReplyToMessageIdHandler } from "../../../handler";
import { translationKeys } from "../../../i18n";
import { IBotCommand } from "../../IBotCommand";
import getUserId from "../../util/getUserId";

export class TransferCommand implements IBotCommand {
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async onReplyFromMessageID(
    msg: Message,
    handler: BotReplyToMessageIdHandler,
    match?: RegExpMatchArray
  ) {
    try {
      const previousText = handler.storage.get("previousText");
      if (previousText && previousText === "transfer_command_reply_no_user_no_amount") {
        await this.handleRecipientReply(msg, handler);
      }

      if (previousText && previousText === "transfer_command_reply_username_pending_amount") {
        await this.handleAmountReply(msg, handler);
      }
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  async onText(msg: Message) {
    try {
      this.bot.replyWithMessageID(
        msg,
        translationKeys.transfer_command_reply_no_user_no_amount,
        this,
        {
          previousText: "transfer_command_reply_no_user_no_amount",
        },
        null,
        {
          disable_web_page_preview: true,
        }
      );
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private async handleRecipientReply(msg: Message, handler: BotReplyToMessageIdHandler) {
    const username = msg.text.replace(/@/i, "");

    try {
      const recipientUserId = await this.getUserIdFromTelegramUsername(msg, username);

      this.bot.replyWithMessageID(
        msg,
        translationKeys.transfer_command_reply_username_pending_amount,
        this,
        {
          previousText: "transfer_command_reply_username_pending_amount",
          username,
          recipientUserId,
        },
        null,
        {
          disable_web_page_preview: true,
        }
      );
    } catch (error) {
      if (error?.message.includes(UserServiceErrorCodes.telegram_username_not_found)) {
        return this.bot.reply(
          msg,
          translationKeys.transfer_command_reply_username_not_found_error,
          null,
          {
            username,
          }
        );
      }

      throw error;
    }
  }

  private async handleAmountReply(msg: Message, handler: BotReplyToMessageIdHandler) {
    const amountMatch = msg.text.match(/^\d+(\.\d{1,2})?$/i);

    if (!Boolean(amountMatch)) {
      return this.bot.replyWithMessageID(
        msg,
        translationKeys.transfer_command_reply_amount_error,
        this,
        null,
        null,
        null,
        {
          amount: msg.text,
        }
      );
    }

    const recipientUserId = handler.storage.get("recipientUserId");
    const username = handler.storage.get("username");
    const [amount] = amountMatch;

    const { pendingTransactionId, currencyCode } = await this.transferFromWallet(
      msg,
      recipientUserId,
      Number(amount)
    );

    this.bot.clearCommandHandler(msg.chat.id);
    this.bot.reply(
      msg,
      translationKeys.transfer_command_reply_confirmation,
      { disable_web_page_preview: true },
      {
        amount,
        username,
        currencyCode, // @TODO get from wallet mcs
        pendingTransactionId,
      }
    );
  }

  private async getUserIdFromTelegramUsername(msg: Message, username: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const request = new GetUserIdByTelegramUsernameRequest();
      request.setTelegramUsername(username);

      this.bot.UserServiceClient.getUserIdByTelegramUsername(request, (error, reply) => {
        if (Boolean(error)) {
          return reject(error);
        }

        resolve(reply.getUserId());
      });
    });
  }

  private async transferFromWallet(
    msg: Message,
    recipientUserId: string,
    amount: number
  ): Promise<TransferFromWalletReply.AsObject> {
    return new Promise((resolve, reject) => {
      getUserId(msg, this.bot.UserServiceClient)
        .then((senderUserId) => {
          const request = new TransferFromWalletRequest();
          request.setSenderUserId(senderUserId);
          request.setRecipientUserId(recipientUserId);
          request.setAmount(amount);
          request.setMsg(JSON.stringify(msg));

          this.bot.WalletServiceClient.transferFromWallet(request, (error, reply) => {
            if (Boolean(error)) {
              return reject(error);
            }

            resolve({
              pendingTransactionId: reply.getPendingTransactionId(),
              currencyCode: reply.getCurrencyCode(),
              senderUserId: reply.getSenderUserId(),
              recipientUserId: reply.getRecipientUserId(),
            });
          });
        })
        .catch((error) => reject(error));
    });
  }

  private handleErrorReply(error: Error, msg: Message) {
    return this.bot.reply(msg, translationKeys.start_command_error);
  }
}
