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
  }
}
