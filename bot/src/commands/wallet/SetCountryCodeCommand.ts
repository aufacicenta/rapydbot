import { Message } from "node-telegram-bot-api";
import {
  SetWalletCountryCodeRequest,
  SetWalletCurrencyCodeRequest,
} from "../../../../wallet/build/client";
import { Bot } from "../../Bot";
import { BotReplyToMessageIdHandler } from "../../handler";
import { translationKeys } from "../../i18n";
import { IBotCommand } from "../IBotCommand";
import { getCountryButtons, getCountryFromName } from "../util/buttons/countries";
import getUserId from "../util/getUserId";

export class SetCountryCodeCommand implements IBotCommand {
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async onReplyFromMessageID(
    msg: Message,
    handler: BotReplyToMessageIdHandler,
    match?: RegExpMatchArray,
  ) {
    try {
      const previousText = handler.storage.get("previousText");
      if (previousText && previousText === "/setcountry") {
        await this.handleCountrySelectionReply(msg);
      }
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  async onText(msg: Message) {
    try {
      this.bot.replyWithMessageID(
        msg,
        translationKeys.setcountry_command_reply,
        this,
        {
          previousText: "/setcountry",
        },
        null,
        {
          disable_web_page_preview: true,
          reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: getCountryButtons(),
          },
        },
      );
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private async handleCountrySelectionReply(msg: Message) {
    const country = getCountryFromName(msg.text);

    if (!Boolean(country)) {
      throw new Error();
    }

    const countryCode = country.iso_alpha2;
    const currencyCode = country.currency_code;
    const setWalletCountryCodeResponse = await this.setWalletCountryCode(msg, countryCode);

    await this.setWalletCurrencyCode(msg, {
      userId: setWalletCountryCodeResponse.userId,
      currencyCode,
    });

    this.bot.replyWithTranslation(
      msg,
      translationKeys.setcountry_command_on_country_select_reply,
      {
        disable_web_page_preview: true,
      },
      {
        currencyCode,
        countryName: country.name,
      },
    );
  }

  private handleErrorReply(error: Error, msg: Message) {
    return this.bot.replyWithTranslation(msg, translationKeys.start_command_error);
  }

  private async setWalletCountryCode(
    msg: Message,
    countryCode: string,
  ): Promise<{
    userId: string;
    countryCode: string;
  }> {
    return new Promise((resolve, reject) => {
      getUserId(msg, this.bot.UserServiceClient)
        .then((userId) => {
          const setWalletCountryCodeRequest = new SetWalletCountryCodeRequest();
          setWalletCountryCodeRequest.setUserId(userId);
          setWalletCountryCodeRequest.setCountryCode(countryCode);

          this.bot.WalletServiceClient.setWalletCountryCode(
            setWalletCountryCodeRequest,
            (error, reply) => {
              if (Boolean(error)) {
                return reject(error);
              }

              const countryCode = reply.getCountryCode();
              resolve({ userId, countryCode });
            },
          );
        })
        .catch((error) => reject(error));
    });
  }

  private async setWalletCurrencyCode(
    msg: Message,
    { userId, currencyCode }: { userId: string; currencyCode: string },
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const request = new SetWalletCurrencyCodeRequest();
      request.setUserId(userId);
      request.setCurrencyCode(currencyCode);

      this.bot.WalletServiceClient.setWalletCurrencyCode(request, (error, reply) => {
        if (Boolean(error)) {
          return reject(error);
        }

        const currencyCode = reply.getCurrencyCode();
        resolve(currencyCode);
      });
    });
  }
}
