import { Moment } from "moment";
import TelegramBotApi, { Message, SendMessageOptions } from "node-telegram-bot-api";
import { StartCommand, WalletCommand } from "./commands";
import { BotLanguageHandler, BotReplyToMessageIdHandler } from "./handler";
import { Commands } from "./types";

export class Bot {
  public api: TelegramBotApi;
  public moment: Moment;

  public languageHandler: BotLanguageHandler;

  private startCommand: StartCommand;
  private walletCommand: WalletCommand;

  public replyToMessageIDMap = new Map<number, BotReplyToMessageIdHandler>();

  constructor() {
    this.api = new TelegramBotApi(process.env.BOT_TOKEN, { polling: true });
    this.languageHandler = new BotLanguageHandler();

    this.startCommand = new StartCommand(this);
    this.walletCommand = new WalletCommand(this);
  }

  async prepare(): Promise<Bot> {
    await this.languageHandler.init();
    return this;
  }

  listen() {
    this.api.on("polling_error", console.error);

    this.api.on("inline_query", (msg) => {
      console.log(msg);
    });

    this.api.on("message", async (msg) => {
      const reply_to_message_id = msg.reply_to_message?.message_id - 1;
      if (Boolean(reply_to_message_id)) {
        const handler = this.getReplyToMessageIdHandler(msg.chat.id);
        const command = handler?.command;

        if (!Boolean(command)) {
          return;
        }

        return command.onReplyFromMessageID(msg, handler);
      }

      // TODO no answers reply
    });

    this.api.onText(/^\/start/i, (msg, match) => this.startCommand.onText(msg));
    this.api.onText(/^\/(wallet|billetera)/i, (msg, match) => this.walletCommand.onText(msg));
  }

  reply(msg: Message, translationKey: string, options?: SendMessageOptions, args?: {}) {
    this.api.sendMessage(
      msg.chat.id,
      this.languageHandler.getTranslation(msg, translationKey, args),
      { parse_mode: "HTML", ...options }
    );
  }

  replyWithMessageID(
    msg: Message,
    translationKey: string,
    command: Commands,
    handlerData?: Record<string, any>,
    reply_to_message_id?: number,
    options?: SendMessageOptions,
    args?: {}
  ) {
    const chat_id = msg.chat.id;

    let handler = this.getReplyToMessageIdHandler(chat_id);

    if (!Boolean(handler)) {
      handler = new BotReplyToMessageIdHandler(this, command);
      handler.id = chat_id;
      this.replyToMessageIDMap.set(chat_id, handler);
    }

    if (Boolean(handlerData)) {
      Object.keys(handlerData).forEach((key) => {
        handler.storage.set(key, handlerData[key]);
      });
    }

    this.reply(
      msg,
      translationKey,
      {
        reply_to_message_id: reply_to_message_id ?? msg.message_id,
        reply_markup: { force_reply: true },
        ...options,
      },
      args
    );
  }

  getTranslation(msg: Message, translationKey: string, args?: {}) {
    return this.languageHandler.getTranslation(msg, translationKey, args);
  }

  private getReplyToMessageIdHandler(chat_id: number) {
    return this.replyToMessageIDMap.get(chat_id);
  }
}
