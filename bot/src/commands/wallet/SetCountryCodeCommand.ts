import { Message } from "node-telegram-bot-api";
import { Bot } from "../../Bot";
import { BotReplyToMessageIdHandler } from "../../handler";
import { translationKeys } from "../../i18n";
import { IBotCommand } from "../IBotCommand";
import getUserId from "../util/getUserId";
import { SetWalletCountryCodeRequest } from "../../../../wallet/build/client";
import { getCountryButtons } from "../util/countries";

export class SetCountryCodeCommand implements IBotCommand {
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
    const countryButtons = getCountryButtons();

    try {
      this.bot.reply(msg, translationKeys.command_text_set_country, {
        disable_web_page_preview: true,
        reply_markup: {
          resize_keyboard: true,
          one_time_keyboard: true,
          keyboard: [...countryButtons],
        },
      });
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private handleErrorReply(error: Error, msg: Message) {
    return this.bot.reply(msg, translationKeys.start_command_error);
  }

  private async setWalletCountryCode(msg: Message): Promise<string> {
    return new Promise((resolve, reject) => {
      getUserId(msg, this.bot.UserServiceClient)
        .then((userId) => {
          const setWalletCountryCodeRequest = new SetWalletCountryCodeRequest();
          setWalletCountryCodeRequest.setUserId(userId);
          setWalletCountryCodeRequest.setCountryCode(msg.text);

          this.bot.WalletServiceClient.setWalletCountryCode(
            setWalletCountryCodeRequest,
            (error, reply) => {
              if (Boolean(error)) {
                return reject(error);
              }

              const countryCode = reply.getCountryCode();
              resolve(countryCode);
            }
          );
        })
        .catch((error) => reject(error));
    });
  }
}
