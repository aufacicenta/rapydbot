import { WalletServiceErrorCodes } from "@rapydbot/wallet/service/error";
import { CreateWalletRequest } from "@rapydbot/wallet/client";

import { Bot } from "../../Bot";
import { CustomMessage } from "../../types";
import { IBotCommand } from "../types";
import util from "../../util";
import { translationKeys } from "../../i18n";

export class CreateWalletCommand implements IBotCommand {
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async onText(msg: CustomMessage) {
    try {
      await this.onCreateWallet(msg);
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private async onCreateWallet(msg: CustomMessage) {
    const e_wallet_address = await this.createWallet(msg);

    // @TODO reply with context if params are missing

    // this.bot.replyWithMessageID(
    //   msg,
    //   translationKeys.createwallet_command_reply,
    //   this,
    //   null,
    //   null,
    //   {
    //     disable_web_page_preview: true,
    //     reply_markup: {
    //       resize_keyboard: true,
    //       keyboard: [
    //         [
    //           {
    //             text: this.bot.handlers.language.getTranslation(
    //               msg,
    //               translationKeys.command_text_setcountry,
    //             ),
    //           },
    //           {
    //             text: this.bot.handlers.language.getTranslation(
    //               msg,
    //               translationKeys.command_text_help,
    //             ),
    //           },
    //         ],
    //       ],
    //     },
    //   },
    //   {
    //     e_wallet_address,
    //     username: msg.chat.username ?? `${msg.chat.first_name} ${msg.chat.last_name}`,
    //   },
    // );
  }

  private async createWallet(msg: CustomMessage): Promise<string> {
    return new Promise((resolve, reject) => {
      util
        .getUserId(msg, this.bot.clients.user)
        .then((userId) => {
          const createWalletRequest = new CreateWalletRequest();

          createWalletRequest.setUserId(userId);

          this.bot.clients.wallet.createWallet(createWalletRequest, (error, reply) => {
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

  private handleErrorReply(error: Error, msg: CustomMessage) {
    if (error?.message.includes(WalletServiceErrorCodes.rapyd_ewallet_exists_for_user_id)) {
      return this.bot.replyWithTranslation(
        msg,
        translationKeys.createwallet_command_error_rapyd_ewallet_exists_for_user_id,
        {
          disable_web_page_preview: true,
        },
      );
    }

    return this.bot.replyWithTranslation(msg, translationKeys.start_command_error);
  }
}
