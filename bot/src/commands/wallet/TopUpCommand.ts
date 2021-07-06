import { TopUpWalletRequest } from "@rapydbot/wallet/client";
import { Message } from "node-telegram-bot-api";
import { WalletServiceErrorCodes } from "../../../../wallet/build/service/error";
import { Bot } from "../../Bot";
import { BotReplyToMessageIdHandler } from "../../handler";
import { translationKeys } from "../../i18n";
import { IBotCommand } from "../IBotCommand";
import { containsErrorCode } from "../util/errorHandling";
import getUserId from "../util/getUserId";

export class TopUpCommand implements IBotCommand {
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
      if (previousText && previousText === "/topup") {
        const amount = msg.text;

        if (!this.isValidAmount(amount)) {
          this.bot.replyWithMessageID(
            msg,
            translationKeys.topup_command_invalid_amount_reply,
            this,
            {
              previousText: "/topup",
            },
            null,
            {
              disable_web_page_preview: true,
            }
          );
        } else {
          const checkoutPageUrl = await this.getCheckoutPageURL(
            msg,
            Number(amount)
          );

          this.bot.reply(
            msg,
            translationKeys.topup_command_checkout_page_reply,
            {
              disable_web_page_preview: true,
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: this.bot.getTranslation(
                        msg,
                        translationKeys.topup_command_checkout_page_button_text,
                        { amount }
                      ),
                      url: checkoutPageUrl,
                    },
                  ],
                ],
              },
            }
          );
        }
      }
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  async onText(msg: Message) {
    try {
      this.bot.replyWithMessageID(
        msg,
        translationKeys.topup_command_amount_reply,
        this,
        {
          previousText: "/topup",
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

  private isValidAmount(amount: any) {
    return /^\d+(\.\d{1,2})?$/i.test(amount);
  }

  private async getCheckoutPageURL(
    msg: Message,
    amount: number
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      getUserId(msg, this.bot.UserServiceClient)
        .then((userId) => {
          const request = new TopUpWalletRequest();
          request.setUserId(userId);
          request.setAmount(amount);
          request.setMsg(JSON.stringify(msg));

          this.bot.WalletServiceClient.topUpWallet(request, (error, reply) => {
            if (Boolean(error)) {
              return reject(error);
            }

            resolve(reply.getCheckoutPageUrl());
          });
        })
        .catch((error) => reject(error));
    });
  }

  private handleErrorReply(error: Error, msg: Message) {
    const { containsCode, errorId } = containsErrorCode(
      error,
      WalletServiceErrorCodes
    );
    const {
      rapyd_ewallet_does_not_have_an_established_country: missing_country,
      rapyd_ewallet_does_not_have_an_established_currency: missing_currency,
    } = WalletServiceErrorCodes;

    if (containsCode) {
      switch (errorId) {
        case missing_country: {
          return this.bot.reply(msg, translationKeys.command_missing_country, {
            disable_web_page_preview: true,
          });
        }
        case missing_currency: {
          return this.bot.reply(msg, translationKeys.command_missing_currency, {
            disable_web_page_preview: true,
          });
        }
      }
    }

    return this.bot.reply(msg, translationKeys.start_command_error);
  }
}
