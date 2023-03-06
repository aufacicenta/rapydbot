import {
  getCampaignActions,
  getCampaignActionMessagesByUserId,
  CampaignServiceErrorCodes,
} from "@rapydbot/campaign";
import {
  findUserByTelegramUserId,
  UserModelAttributes,
  UserServiceErrorCodes,
} from "@rapydbot/user";

import { TGInformerBot } from "../../tg-informer";
import { CustomMessage } from "../../types";
import { IBotCommand } from "../types";

import { Action, Actions } from "./types";

const DEFAULT_TIMEOUT = 5000;

export class TrainCommand implements IBotCommand {
  private bot: TGInformerBot;

  private actions = new Map<UserModelAttributes["id"], Actions>();
  private currentAction = new Map<UserModelAttributes["id"], Action | undefined>();

  constructor(bot: TGInformerBot) {
    this.bot = bot;
  }

  async onText(msg: CustomMessage) {
    try {
      const { userId } = await findUserByTelegramUserId(this.bot.clients.user, {
        telegramFromUserId: msg.from.id,
      });

      const currentAction = this.currentAction.get(userId);

      if (currentAction) {
        const customMessage = { ...msg, user: { id: userId } };

        this.callAction(customMessage, currentAction);

        if (!currentAction.isTimeoutSet) {
          this.setActionTimeout(customMessage, currentAction);
        }

        return;
      }

      if (/^\/?(train|entrenar)/i.test(msg.text)) {
        return;
      }

      this.bot.reply(msg, `Escribe "entrenar" para comenzar.`);
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  async runTrainingQueue(msg: CustomMessage): Promise<void> {
    try {
      // @TODO get campaignId from database after a message is sent to the user by the bot and they accept the campaign
      const campaignId = "ace9fc09-440d-49e7-8462-a416c232cf4b";

      // @TODO check if user has already started this campaign by storing user_id in campaign_action_message, then query for campaign_action_id

      const campaignActions = await getCampaignActions(this.bot.clients.campaign, { campaignId });

      const { userId } = await findUserByTelegramUserId(this.bot.clients.user, {
        telegramFromUserId: msg.from.id,
      });

      const campaignActionMessagesByUserId = await getCampaignActionMessagesByUserId(
        this.bot.clients.campaign,
        { campaignActionId: campaignActions[0].id, userId },
      );

      if (campaignActionMessagesByUserId.length > 0) {
        throw new Error(CampaignServiceErrorCodes.user_has_started_this_campaign);
      }

      const actions: Actions = {};

      for (const action of campaignActions) {
        const isLast =
          action.intentAction === campaignActions[campaignActions.length - 1].intentAction;

        actions[action.intentAction] = {
          isTimeoutSet: false,
          isLast,
          id: action.id,
          initialInstruction: action.initialInstruction,
          reply: action.reply,
          intentAction: action.intentAction,
          campaignId: action.campaignId,
        };
      }

      this.actions.set(userId, actions);
      this.currentAction.set(userId, actions[campaignActions[0].intentAction]);
      this.bot.reply(msg, actions[campaignActions[0].intentAction].initialInstruction);
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  private setActionTimeout(msg: CustomMessage, current: Action): void {
    const actions = this.actions.get(msg.user.id);

    for (const key in actions) {
      const next = actions[key];
      const isNotCurrent = next.intentAction !== current.intentAction;

      if (isNotCurrent && next.isTimeoutSet === false) {
        setTimeout(() => {
          this.currentAction.set(msg.user.id, next);

          this.bot.reply(msg, next.initialInstruction);

          if (next.isLast) {
            setTimeout(() => {
              this.currentAction.set(msg.user.id, undefined);

              // @TODO send final stream-chat message attachment to identify completion

              // @TODO ETH address command
              this.bot.reply(
                msg,
                `La sesión de entrenamiento ha finalizado. 🥳

A qué dirección de ETH enviamos tus USDT? 🤑`,
              );

              this.actions.delete(msg.user.id);

              // @TODO mark campaign_user record as completed
            }, DEFAULT_TIMEOUT);
          }
        }, DEFAULT_TIMEOUT);

        break;
      }
    }

    actions[current.intentAction].isTimeoutSet = true;
    this.actions.set(msg.user.id, actions);
  }

  private async callAction(msg: CustomMessage, action: Action): Promise<void> {
    this.bot.handlers.context.sendMessage(msg, action);

    this.bot.reply(msg, action.reply);
  }

  private handleErrorReply(error: Error, msg: CustomMessage) {
    switch (error.message) {
      case UserServiceErrorCodes.user_not_found: {
        // @TODO reply with i18n user not found message
        this.bot.reply(msg, `Tu usuario de telegram no está registrado en el sistema.`);
        break;
      }
      case CampaignServiceErrorCodes.user_has_started_this_campaign: {
        // @TODO reply with i18n user_has_started_this_campaign message
        this.bot.reply(msg, `Ya has participado en esta campaña.`);
        break;
      }

      default: {
        // @TODO default error message
        this.bot.reply(msg, `Error al enviar el mensaje.`);
        break;
      }
    }

    throw error;
  }
}
