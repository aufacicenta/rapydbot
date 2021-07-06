import {
  GetUserIdByTelegramUsernameRequest,
  GetUserReply,
  GetUserRequest,
} from "@rapydbot/user/client";
import { UserServiceErrorCodes } from "@rapydbot/user/service/error";
import { Message } from "node-telegram-bot-api";
import {
  GetUserIdFromWalletAddressRequest,
  SetTransferFromWalletResponseRequest,
  TransferFromWalletReply,
  TransferFromWalletRequest,
} from "../../../../../wallet/build/client";
import { WalletServiceErrorCodes } from "../../../../../wallet/build/service/error";
import { Bot } from "../../../Bot";
import {
  BotReplyToMessageIdHandler,
  BotReplyToMessageIdHandlerStorageKeys,
} from "../../../handler";
import { translationKeys } from "../../../i18n";
import { IBotCommand } from "../../IBotCommand";
import getUserId from "../../util/getUserId";
import { containsErrorCode } from "../../util/errorHandling";

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
      if (
        previousText &&
        previousText === "transfer_command_reply_no_user_no_amount"
      ) {
        await this.handleRecipientReply(msg, handler);
        return;
      }

      if (
        previousText &&
        previousText === "transfer_command_reply_username_pending_amount"
      ) {
        await this.handleAmountReply(msg, handler);
        return;
      }

      const pendingTransactionId = handler.storage.get("pendingTransactionId");
      const senderUsername = handler.storage.get("senderUsername");
      const amount = handler.storage.get("amount");
      const currency = handler.storage.get("currency");
      const senderUserId = handler.storage.get("senderUserId");
      const recipientUserId = handler.storage.get("recipientUserId");
      if (
        pendingTransactionId &&
        senderUsername &&
        amount &&
        currency &&
        senderUserId &&
        recipientUserId
      ) {
        await this.handleTransferFromWalletResponseReply(msg, handler, {
          pendingTransactionId,
          senderUsername,
          amount,
          currency,
          senderUserId,
          recipientUserId,
        });

        return;
      }
    } catch (error) {
      this.handleErrorReply(error, msg, null);
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
      this.handleErrorReply(error, msg, null);
    }
  }

  public async replyToTransferFundsBetweenEwalletsCreatedWebhook({
    data: {
      senderUserId,
      recipientUserId,
      msg: msgString,
      amount,
      currency_code: currency,
      pending_transaction_id,
    },
  }: {
    data: {
      senderUserId: string;
      recipientUserId: string;
      msg: string;
      amount: number;
      currency_code: string;
      pending_transaction_id: string;
    };
  }) {
    const msg: Message = JSON.parse(msgString);

    try {
      const recipient = await this.getUser(recipientUserId);
      const sender = await this.getUser(senderUserId);

      this.bot.replyWithHandler(
        {
          ...msg,
          chat: {
            ...msg.chat,
            id: recipient.telegramPrivateChatId,
            type: "private",
          },
        },
        translationKeys.transfer_command_notify_recipient_about_incoming_transfer,
        this,
        {
          pendingTransactionId: pending_transaction_id,
          senderUsername: sender.telegramUsername,
          amount,
          currency,
          senderUserId,
          recipientUserId,
        },
        {
          reply_markup: {
            force_reply: false,
            keyboard: [
              [
                {
                  text: this.bot.getTranslation(
                    msg,
                    translationKeys.transfer_command_button_accept
                  ),
                },
                {
                  text: this.bot.getTranslation(
                    msg,
                    translationKeys.transfer_command_button_reject
                  ),
                },
              ],
            ],
          },
        },
        {
          amount,
          currency,
          senderUsername: sender.telegramUsername,
        }
      );
    } catch (error) {
      this.handleErrorReply(error, msg, null);
    }
  }

  private getUserIdFromWalletAddress(address: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const request = new GetUserIdFromWalletAddressRequest();
      request.setRapydEwalletAddress(address);

      this.bot.WalletServiceClient.getUserIdFromWalletAddress(
        request,
        (error, reply) => {
          if (Boolean(error)) {
            reject(error);
            return;
          }

          resolve(reply.getUserId());
        }
      );
    });
  }

  private getUser(userId: string): Promise<GetUserReply.AsObject> {
    return new Promise((resolve, reject) => {
      const request = new GetUserRequest();
      request.setUserId(userId);

      this.bot.UserServiceClient.getUser(request, (error, reply) => {
        if (Boolean(error)) {
          reject(error);
          return;
        }

        resolve({
          userId: reply.getUserId(),
          telegramFromUserId: reply.getTelegramFromUserId(),
          telegramPrivateChatId: reply.getTelegramPrivateChatId(),
          telegramUsername: reply.getTelegramUsername(),
          telegramUserId: reply.getTelegramUserId(),
        });
      });
    });
  }

  private async handleRecipientReply(
    msg: Message,
    handler: BotReplyToMessageIdHandler
  ) {
    const username = msg.text.replace(/@/i, "");

    try {
      const recipientUserId = await this.getUserIdFromTelegramUsername(
        msg,
        username
      );

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
      this.handleErrorReply(error, msg, { username });
    }
  }

  private async handleAmountReply(
    msg: Message,
    handler: BotReplyToMessageIdHandler
  ) {
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

    const { pendingTransactionId, currencyCode } =
      await this.transferFromWallet(msg, recipientUserId, Number(amount));

    this.bot.clearCommandHandler(msg.chat.id);
    this.bot.reply(
      msg,
      translationKeys.transfer_command_reply_confirmation,
      { disable_web_page_preview: true },
      {
        amount,
        username,
        currencyCode,
        pendingTransactionId,
      }
    );
  }

  private async handleTransferFromWalletResponseReply(
    msg: Message,
    handler: BotReplyToMessageIdHandler,
    {
      senderUsername,
      amount,
      currency,
      pendingTransactionId,
      senderUserId,
      recipientUserId,
    }: Omit<BotReplyToMessageIdHandlerStorageKeys, "username" | "previousText">
  ) {
    const response = msg.text;

    if (/[Accept|Aceptar]/i.test(response)) {
      const request = new SetTransferFromWalletResponseRequest();
      request.setSenderUserId(senderUserId);
      request.setRecipientUserId(recipientUserId);
      request.setPendingTransactionId(pendingTransactionId);
      request.setResponseStatus("accept");

      this.bot.WalletServiceClient.setTransferFromWalletResponse(
        request,
        (error, reply) => {
          if (Boolean(error)) {
            this.handleErrorReply(error, msg, { pendingTransactionId });
          }

          this.bot.replyWithMessageID(
            msg,
            translationKeys.transfer_command_reply_accept_transfer_request,
            this,
            null,
            null,
            null,
            {
              amount: reply.getAmount(),
              senderUsername,
              currency: reply.getCurrencyCode(),
            }
          );
        }
      );

      return;
    }
  }

  private async getUserIdFromTelegramUsername(
    msg: Message,
    username: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const request = new GetUserIdByTelegramUsernameRequest();
      request.setTelegramUsername(username);

      this.bot.UserServiceClient.getUserIdByTelegramUsername(
        request,
        (error, reply) => {
          if (Boolean(error)) {
            return reject(error);
          }

          resolve(reply.getUserId());
        }
      );
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

          this.bot.WalletServiceClient.transferFromWallet(
            request,
            (error, reply) => {
              if (Boolean(error)) {
                return reject(error);
              }

              resolve({
                pendingTransactionId: reply.getPendingTransactionId(),
                currencyCode: reply.getCurrencyCode(),
                senderUserId: reply.getSenderUserId(),
                recipientUserId: reply.getRecipientUserId(),
              });
            }
          );
        })
        .catch((error) => reject(error));
    });
  }

  private handleErrorReply(error: Error, msg: Message, context: any) {
    const errors = { ...UserServiceErrorCodes, ...WalletServiceErrorCodes };
    const { containsCode, errorId } = containsErrorCode(error, errors);
    const {
      rapyd_ewallet_does_not_have_an_established_currency: missingCurrency,
      telegram_username_not_found: userNotFound,
      rapyd_transfer_to_ewallet_is_not_paid: unpaidTransfer,
    } = errors;

    if (containsCode) {
      switch (errorId) {
        case missingCurrency: {
          return this.bot.reply(msg, translationKeys.command_missing_currency, {
            disable_web_page_preview: true,
          });
        }
        case userNotFound: {
          return this.bot.reply(
            msg,
            translationKeys.transfer_command_reply_username_not_found_error,
            null,
            {
              ...context,
            }
          );
        }
        case unpaidTransfer: {
          return this.bot.reply(
            msg,
            translationKeys.transfer_command_error_reply_transfer_from_wallet_response_is_not_paid,
            null,
            {
              ...context,
            }
          );
        }
      }
    }

    return this.bot.reply(msg, translationKeys.start_command_error);
  }
}
