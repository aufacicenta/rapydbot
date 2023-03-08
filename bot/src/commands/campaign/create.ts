import { findUserByTelegramUserId } from "@rapydbot/user";
import { createCampaign } from "@rapydbot/campaign";

import { IBotCommand } from "../types";
import { TGInformerBot } from "../../tg-informer";
import { CustomMessage } from "../../types";
import { translationKeys } from "../../i18n";

export class CreateCampaignCommand implements IBotCommand {
  private bot: TGInformerBot;

  constructor(bot: TGInformerBot) {
    this.bot = bot;
  }

  async onText(msg: CustomMessage) {
    await this.createCampaign(msg);
  }

  private async createCampaign(msg: CustomMessage): Promise<void> {
    try {
      const { userId } = await findUserByTelegramUserId(this.bot.clients.user, {
        telegramFromUserId: msg.from.id,
      });

      const { campaignId } = await createCampaign(this.bot.clients.campaign, {
        issuerId: userId,
      });

      // @TODO i18n
      this.bot.reply(msg, `¡Campaña creada!`, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `Editar Campaña`,
                url: `http://tgi.com:3004/campaign/edit/${campaignId}`,
              },
            ],
          ],
        },
      });
    } catch (error) {
      console.log(error);

      this.handleErrorReply(error, msg);
    }
  }

  private handleErrorReply(error: Error, msg: CustomMessage) {
    // @TODO handle error codes switch
    return this.bot.replyWithTranslation(msg, translationKeys.start_command_error);
  }
}
