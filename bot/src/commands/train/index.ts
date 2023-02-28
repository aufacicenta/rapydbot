import { getCampaignActions } from "@rapydbot/campaign";

import { Bot } from "../../Bot";
import { translationKeys } from "../../i18n";
import { CustomMessage } from "../../types";
import { IBotCommand } from "../types";

import { Action, Actions } from "./types";

const DEFAULT_TIMEOUT = 5000;

export class TrainCommand implements IBotCommand {
  private bot: Bot;

  private actions = new Map<number, Actions>();
  private currentAction = new Map<number, Action | undefined>();

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async onText(msg: CustomMessage) {
    const currentAction = this.currentAction.get(msg.from.id);

    if (currentAction) {
      this.callAction(msg, currentAction);

      if (!currentAction.isTimeoutSet) {
        this.setActionTimeout(msg, currentAction);
      }

      return;
    }

    if (/^\/?(train|entrenar)/i.test(msg.text)) {
      return;
    }

    try {
      this.bot.reply(msg, `Escribe "entrenar" para comenzar.`);
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  async runTrainingQueue(msg: CustomMessage): Promise<void> {
    // @TODO get campaignId from database after a message is sent to the user by the bot and they accept the campaign
    const campaignId = "d8905b8f-c53a-42f5-9629-7afa5d6dae43";

    // @TODO check if user has already trained by storing their id in the database of by checking the stream-chat messages

    const campaignActions = await getCampaignActions(this.bot.clients.campaign, { campaignId });

    const actions: Actions = {};

    for (const action of campaignActions) {
      const isLast =
        action.intentAction === campaignActions[campaignActions.length - 1].intentAction;

      actions[action.intentAction] = {
        isTimeoutSet: false,
        isLast,
        initialInstruction: action.initialInstruction,
        reply: action.reply,
        intentAction: action.intentAction,
        campaignId: action.campaignId,
      };
    }

    this.actions.set(msg.from.id, actions);
    this.currentAction.set(msg.from.id, actions[campaignActions[0].intentAction]);
    this.bot.reply(msg, actions[campaignActions[0].intentAction].initialInstruction);
  }

  private setActionTimeout(msg: CustomMessage, current: Action): void {
    const actions = this.actions.get(msg.from.id);

    for (const key in actions) {
      const next = actions[key];
      const isNotCurrent = next.intentAction !== current.intentAction;

      if (isNotCurrent && next.isTimeoutSet === false) {
        setTimeout(() => {
          this.currentAction.set(msg.from.id, next);

          this.bot.reply(msg, next.initialInstruction);

          if (next.isLast) {
            setTimeout(() => {
              this.currentAction.set(msg.from.id, undefined);

              // @TODO send final stream-chat message attachment to identify completion

              // @TODO ETH address command
              this.bot.reply(
                msg,
                `La sesión de entrenamiento ha finalizado. 🥳

A qué dirección de ETH enviamos tus USDT? 🤑`,
              );

              this.actions.delete(msg.from.id);
            }, DEFAULT_TIMEOUT);
          }
        }, DEFAULT_TIMEOUT);

        break;
      }
    }

    actions[current.intentAction].isTimeoutSet = true;
    this.actions.set(msg.from.id, actions);
  }

  private async callAction(msg: CustomMessage, action: Action): Promise<void> {
    this.bot.handlers.context.sendMessage(msg, [{ type: "text", value: action.intentAction }]);

    this.bot.reply(msg, action.reply);
  }

  private handleErrorReply(error: Error, msg: CustomMessage) {
    return this.bot.replyWithTranslation(msg, translationKeys.start_command_error);
  }
}
