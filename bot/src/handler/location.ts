import { createUserLocation, findUserByTelegramUserId } from "@rapydbot/user";

import { TGInformerBot } from "../tg-informer";
import { CustomMessage } from "../types";

export class UserLocationHandler {
  private bot: TGInformerBot;

  constructor(bot: TGInformerBot) {
    this.bot = bot;
  }

  async setLocation(msg: CustomMessage) {
    const { userId } = await findUserByTelegramUserId(this.bot.clients.user, {
      telegramFromUserId: msg.from.id,
    });

    await createUserLocation(this.bot.clients.user, {
      userId,
      latitude: msg.location.latitude,
      longitude: msg.location.longitude,
    });

    // @TODO i18n
    this.bot.reply(
      msg,
      `Bien! Tu ubicación ha sido guardada.

Solicitaré tu ubicación cada 2 semanas para notificarte sobre campañas relevantes. Si no respondes, asumiré que no quieres participar más.


Ahora, prueba uno de estos comandos:`,
      {
        reply_markup: {
          inline_keyboard: [[{ text: `/crearcampaña` }, { text: `/campañas` }]],
        },
      },
    );
  }
}
