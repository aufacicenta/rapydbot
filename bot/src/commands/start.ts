import { findUserByTelegramUserIdOrCreateUser } from "@rapydbot/user";

import { TGInformerBot } from "../tg-informer";
import { translationKeys } from "../i18n";
import { CustomMessage } from "../types";

import { IBotCommand } from "./types";

export class StartCommand implements IBotCommand {
  private bot: TGInformerBot;

  constructor(bot: TGInformerBot) {
    this.bot = bot;
  }

  async onText(msg: CustomMessage) {
    try {
      await this.createUser(msg);
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private async createUser(msg: CustomMessage): Promise<void> {
    await findUserByTelegramUserIdOrCreateUser(this.bot.clients.user, {
      telegramFromUserId: msg.from.id,
      telegramUsername: msg.from.username,
      telegramPrivateChatId: msg.chat.type === "private" ? msg.chat.id : undefined,
    });

    // @TODO i18n
    this.bot.reply(
      msg,
      `Guardamos tus coordenadas periódicamente para asignarte campañas de manera eficiente.`,
      {
        reply_markup: { keyboard: [[{ text: `Compartir Coordenadas`, request_location: true }]] },
      },
    );
  }

  private handleErrorReply(error: Error, msg: CustomMessage) {
    return this.bot.replyWithTranslation(msg, translationKeys.start_command_error);
  }
}
