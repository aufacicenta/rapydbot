import { Bot } from "../Bot";
import { translationKeys } from "../i18n";
import { CustomMessage } from "../types";

import { IBotCommand } from "./types";

const msgOptions = {
  silent: true,
  skip_push: true,
};

type Queue = Array<{
  hasGivenFirstInstruction: boolean;
  initialInstruction: string;
  action: (msg: CustomMessage) => Promise<void>;
}>;

export class TrainCommand implements IBotCommand {
  private bot: Bot;

  private queues = new Map<number, Queue>();

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async onText(msg: CustomMessage) {
    const queue = this.queues.get(msg.from.id);
    const next = queue ? queue[0] : null;

    if (next) {
      next.action.call(this, msg, next);

      return;
    }

    if (/^\/(train|entrenar)/i.test(msg.text)) {
      return;
    }

    try {
      await this.bot.reply(msg, `Escribe "entrenar" para comenzar.`);
    } catch (error) {
      this.handleErrorReply(error, msg);
    }
  }

  async runTrainingQueue(msg: CustomMessage): Promise<void> {
    const queue: Queue = [
      {
        hasGivenFirstInstruction: false,
        initialInstruction: `Bienvenido! \nEnvía textos que representen la instrucción de "Crear una wallet" o "Crear una billetera"`,
        action: this.walletCreate,
      },
      {
        hasGivenFirstInstruction: false,
        initialInstruction: `Ahora transactionsFrom`,
        action: this.transactionsFrom,
      },
      {
        hasGivenFirstInstruction: false,
        initialInstruction: `Ahora transactionsWhen`,
        action: this.transactionsWhen,
      },
      {
        hasGivenFirstInstruction: false,
        initialInstruction: `Ahora cardsNew`,
        action: this.cardsNew,
      },
      {
        hasGivenFirstInstruction: false,
        initialInstruction: `Ahora contactsAdd`,
        action: this.contactsAdd,
      },
    ];

    this.queues.set(msg.from.id, queue);

    queue[0].hasGivenFirstInstruction = true;
    this.bot.reply(msg, queue[0].initialInstruction);

    this.train(msg, queue);
  }

  private async train(msg: CustomMessage, queue: Queue): Promise<void> {
    const interval = setInterval(async () => {
      const next = queue.shift();

      if (next) {
        this.queues.set(msg.from.id, queue);

        if (!next.hasGivenFirstInstruction) {
          this.bot.reply(msg, next.initialInstruction);
        }

        return;
      }

      this.bot.reply(
        msg,
        `La sesión de entrenamiento ha finalizado. A qué dirección de ETH enviamos tus USDT?`,
      );

      clearInterval(interval);

      this.queues.delete(msg.from.id);
      // @TODO send USDT to the user who finishes the training
    }, 10_000);
  }

  private async walletCreate(msg: CustomMessage): Promise<void> {
    this.sendMessage(msg, "wallet_create");

    this.bot.reply(
      msg,
      `¡Mensaje recibido! Continúa enviando respuestas a: \n\n<strong>"Quiero crear una billetera"</strong>`,
    );
  }

  private async transactionsFrom(msg: CustomMessage): Promise<void> {
    this.sendMessage(msg, "transactions_from");
    this.bot.reply(
      msg,
      `¡Mensaje recibido! Continúa enviando respuestas a: "Quiero saber sobre transacciones de alguien"`,
    );
  }

  private async transactionsWhen(msg: CustomMessage): Promise<void> {
    this.sendMessage(msg, "transactions_when");
    this.bot.reply(
      msg,
      `¡Mensaje recibido! Continúa enviando respuestas a: "Quiero saber sobre transacciones del pasado"`,
    );
  }

  private async cardsNew(msg: CustomMessage): Promise<void> {
    this.sendMessage(msg, "cards_new");
    this.bot.reply(
      msg,
      `¡Mensaje recibido! Continúa enviando respuestas a: "Quiero crear una tarjeta"`,
    );
  }

  private async contactsAdd(msg: CustomMessage): Promise<void> {
    this.sendMessage(msg, "contacts_add");
    this.bot.reply(
      msg,
      `¡Mensaje recibido! Continúa enviando respuestas a: "Quiero agregar un contacto"`,
    );
  }

  private async sendMessage(msg: CustomMessage, value: string): Promise<void> {
    console.log("sending message", value);
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
