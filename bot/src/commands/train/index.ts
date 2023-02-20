import { Bot } from "../../Bot";
import { translationKeys } from "../../i18n";
import { CustomMessage } from "../../types";
import { IBotCommand } from "../types";

import { instructions } from "./instructions";
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
      currentAction.action.call(this, msg);

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
    const actions = {
      [this.walletCreate.name]: {
        isTimeoutSet: false,
        initialInstruction: instructions[this.walletCreate.name],
        action: this.walletCreate,
      },
      [this.transactionsFrom.name]: {
        isTimeoutSet: false,
        initialInstruction: instructions[this.transactionsFrom.name],
        action: this.transactionsFrom,
      },
      [this.transactionsWhen.name]: {
        isTimeoutSet: false,
        initialInstruction: instructions[this.transactionsWhen.name],
        action: this.transactionsWhen,
      },
      [this.transactionsAmount.name]: {
        isTimeoutSet: false,
        initialInstruction: instructions[this.transactionsAmount.name],
        action: this.transactionsAmount,
      },
      [this.cardsNew.name]: {
        isTimeoutSet: false,
        initialInstruction: instructions[this.cardsNew.name],
        action: this.cardsNew,
      },
      [this.cardsBalance.name]: {
        isTimeoutSet: false,
        initialInstruction: instructions[this.cardsBalance.name],
        action: this.cardsBalance,
      },
      [this.contactsAdd.name]: {
        isTimeoutSet: false,
        initialInstruction: instructions[this.contactsAdd.name],
        action: this.contactsAdd,
        isLast: true,
      },
    };

    this.actions.set(msg.from.id, actions);
    this.currentAction.set(msg.from.id, actions[this.walletCreate.name]);
    this.bot.reply(msg, actions[this.walletCreate.name].initialInstruction);
  }

  private setActionTimeout(msg: CustomMessage, current: Action): void {
    const actions = this.actions.get(msg.from.id);

    for (const key in actions) {
      const next = actions[key];
      const isNotCurrent = next.action.name !== current.action.name;

      if (isNotCurrent && next.isTimeoutSet === false) {
        setTimeout(() => {
          this.currentAction.set(msg.from.id, next);
          this.bot.reply(msg, next.initialInstruction);

          if (next.isLast) {
            setTimeout(() => {
              this.currentAction.set(msg.from.id, undefined);

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

    actions[current.action.name].isTimeoutSet = true;
    this.actions.set(msg.from.id, actions);
  }

  private async walletCreate(msg: CustomMessage): Promise<void> {
    this.sendMessage(msg, "wallet_create");

    this.bot.reply(
      msg,
      `¡Mensaje recibido!

Continúa enviando instrucciones para: <strong>crear una billetera</strong>.`,
    );
  }

  private async transactionsFrom(msg: CustomMessage): Promise<void> {
    this.sendMessage(msg, "transactions_from");

    this.bot.reply(
      msg,
      `¡Mensaje recibido!

Continúa enviando instrucciones para <strong>saber sobre transacciones de alguien hacia ti</strong>.`,
    );
  }

  private async transactionsWhen(msg: CustomMessage): Promise<void> {
    this.sendMessage(msg, "transactions_when");

    this.bot.reply(
      msg,
      `¡Mensaje recibido!

Continúa enviando instrucciones para: <strong>saber sobre transacciones del pasado</strong>.`,
    );
  }

  private async transactionsAmount(msg: CustomMessage): Promise<void> {
    this.sendMessage(msg, "transactions_amount");

    this.bot.reply(
      msg,
      `¡Mensaje recibido!

Continúa enviando instrucciones para: <strong>saber sobre transacciones de un monto específico</strong>.`,
    );
  }

  private async cardsNew(msg: CustomMessage): Promise<void> {
    this.sendMessage(msg, "cards_new");

    this.bot.reply(
      msg,
      `¡Mensaje recibido!

Continúa enviando instrucciones para: <strong>crear una tarjeta</strong>.`,
    );
  }

  private async cardsBalance(msg: CustomMessage): Promise<void> {
    this.sendMessage(msg, "cards_balance");

    this.bot.reply(
      msg,
      `¡Mensaje recibido!

Continúa enviando instrucciones para: <strong>saber el balance de una tarjeta</strong>.`,
    );
  }

  private async contactsAdd(msg: CustomMessage): Promise<void> {
    this.sendMessage(msg, "contacts_add");

    this.bot.reply(
      msg,
      `¡Mensaje recibido!

Continúa enviando instrucciones para: <strong>agregar un contacto</strong>.`,
    );
  }

  private async sendMessage(msg: CustomMessage, value: string): Promise<void> {
    console.log("sending message", value);
    // const msgOptions = {
    //   silent: true,
    //   skip_push: true,
    // };

    // await this.bot.context.channel.sendMessage({
    //   text: msg.text,
    //   user_id: msg.from.id.toString(),
    //   attachments: [{ type: "text", fields: [{ title: "intent", value, short: true }] }],
    //   ...msgOptions,
    // });
  }

  private handleErrorReply(error: Error, msg: CustomMessage) {
    return this.bot.replyWithTranslation(msg, translationKeys.start_command_error);
  }
}
