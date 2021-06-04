import { FindUserByTelegramUserIdRequest } from "@rapydbot/user/client";
import { CreateWalletRequest } from "@rapydbot/wallet/client";
import { WalletServiceErrorCodes } from "@rapydbot/wallet/service/error";
import { Message } from "node-telegram-bot-api";
import { Bot } from "../Bot";
import { BotReplyToMessageIdHandler } from "../handler";
import { translationKeys } from "../i18n";
import { IBotCommand } from "./IBotCommand";

export class CreateWalletCommand implements IBotCommand {
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
      const replyToMessageText = msg.reply_to_message.text;
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  async onText(msg: Message) {
    try {
      await this.handleCreateOption(msg);
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private async handleCreateOption(msg: Message) {
    const e_wallet_address = await this.createWallet(msg);

    this.bot.replyWithMessageID(
      msg,
      translationKeys.createwallet_command_reply,
      this,
      {},
      null,
      {
        disable_web_page_preview: true,
        reply_markup: {
          resize_keyboard: true,
          keyboard: [
            [
              {
                text: this.bot.languageHandler.getTranslation(
                  msg,
                  translationKeys.command_text_topup
                ),
              },
              {
                text: this.bot.languageHandler.getTranslation(
                  msg,
                  translationKeys.command_text_balance
                ),
              },
            ],
          ],
        },
      },
      {
        e_wallet_address,
        username: msg.chat.username ?? `${msg.chat.first_name} ${msg.chat.last_name}`,
      }
    );
  }

  private handleErrorReply(error: Error, msg: Message) {
    if (error?.message.includes(WalletServiceErrorCodes.rapyd_ewallet_exists_for_user_id)) {
      return this.bot.reply(
        msg,
        translationKeys.createwallet_command_error_rapyd_ewallet_exists_for_user_id
      );
    }

    return this.bot.reply(msg, translationKeys.start_command_error);
  }

  private async createWallet(msg: Message): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getUserId(msg)
        .then((userId) => {
          const createWalletRequest = new CreateWalletRequest();
          createWalletRequest.setUserId(userId);

          this.bot.WalletServiceClient.createWallet(createWalletRequest, (error, reply) => {
            if (Boolean(error)) {
              return reject(error);
            }

            const eWalletAddress = reply.getRapydEwalletAddress();
            resolve(eWalletAddress);
          });
        })
        .catch((error) => reject(error));
    });
  }

  private async getUserId(msg: Message): Promise<string> {
    return new Promise((resolve, reject) => {
      const findUserRequestByTelegram = new FindUserByTelegramUserIdRequest();

      findUserRequestByTelegram.setTelegramFromUserId(msg.from.id);

      this.bot.UserServiceClient.findUserByTelegramUserId(
        findUserRequestByTelegram,
        (error, reply) => {
          if (Boolean(error)) {
            return reject(error);
          }

          const user_id = reply.getUserId();
          resolve(user_id);
        }
      );
    });
  }
}
