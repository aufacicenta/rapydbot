import { createCampaignActionMessage } from "@rapydbot/campaign";

import { Action } from "../commands/train/types";
import { TGInformerBot } from "../tg-informer";
import { CustomMessage } from "../types";

import { IBotHandler } from "./types";

export class ContextHandler implements IBotHandler {
  private bot: TGInformerBot;

  constructor(bot: TGInformerBot) {
    this.bot = bot;
  }

  onText(_msg: CustomMessage) {
    return;
  }

  async sendMessage(msg: CustomMessage, action: Action) {
    createCampaignActionMessage(this.bot.clients.campaign, {
      campaignActionId: action.id,
      userId: msg.user.id,
      message: msg.text,
    });
  }
}
