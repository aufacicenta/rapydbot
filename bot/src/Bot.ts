import USER_ClientGenerator, { UserClient } from "@rapydbot/user/client";
import WALLET_ClientGenerator, { WalletClient } from "@rapydbot/wallet/client";
import moment, { Moment } from "moment";
import TelegramBotApi, { Message, SendMessageOptions } from "node-telegram-bot-api";
import { StartCommand } from "./commands";
import { HelpCommand } from "./commands/HelpCommand";
import {
  BalanceCommand,
  CreateWalletCommand,
  SetCountryCodeCommand,
  SetCurrencyCodeCommand,
  TopUpCommand,
  TransferCommand,
} from "./commands/wallet";
import {
  BotLanguageHandler,
  BotReplyToMessageIdHandler,
  BotReplyToMessageIdHandlerStorageKeys,
} from "./handler";
import { translationKeys } from "./i18n";
import { Commands } from "./types";

export class Bot {
  public api: TelegramBotApi;
  public moment: Moment;

  public languageHandler: BotLanguageHandler;

  private startCommand: StartCommand;
  private createWalletCommand: CreateWalletCommand;
  private topUpCommand: TopUpCommand;
  private setCountryCodeCommand: SetCountryCodeCommand;
  private setCurrencyCodeCommand: SetCurrencyCodeCommand;
  private helpCommand: HelpCommand;
  public balanceCommand: BalanceCommand;
  public transferCommand: TransferCommand;

  public UserServiceClient: UserClient;
  public WalletServiceClient: WalletClient;

  public replyToMessageIDMap = new Map<number, BotReplyToMessageIdHandler>();

  constructor() {
    this.api = new TelegramBotApi(process.env.BOT_TOKEN, { polling: true });
    this.languageHandler = new BotLanguageHandler();

    this.startCommand = new StartCommand(this);
    this.createWalletCommand = new CreateWalletCommand(this);
    this.topUpCommand = new TopUpCommand(this);
    this.setCountryCodeCommand = new SetCountryCodeCommand(this);
    this.setCurrencyCodeCommand = new SetCurrencyCodeCommand(this);
    this.helpCommand = new HelpCommand(this);
    this.balanceCommand = new BalanceCommand(this);
    this.transferCommand = new TransferCommand(this);

    this.moment = moment();

    this.UserServiceClient = new USER_ClientGenerator(process.env.USER_SERVICE_URL).create();
    this.WalletServiceClient = new WALLET_ClientGenerator(
      process.env.WALLET_SERVICE_URL
    ).create();
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
    });

    this.api.onText(/^\/start/i, (msg, match) => this.startCommand.onText(msg));
    this.api.onText(/^\/(createwallet|crearbilletera)/i, (msg, match) =>
      this.createWalletCommand.onText(msg)
    );
    this.api.onText(/^\/(topup|recarga)/i, (msg, match) => this.topUpCommand.onText(msg));
    this.api.onText(/^\/(setcountry|fijarpais)/, (msg, match) =>
      this.setCountryCodeCommand.onText(msg)
    );
    this.api.onText(/^\/(setcurrency|fijarmoneda)/i, (msg, match) =>
      this.setCurrencyCodeCommand.onText(msg)
    );
    this.api.onText(/^\/balance/i, (msg, match) => this.balanceCommand.onText(msg));
    this.api.onText(/^\/(transfer|enviar)/i, (msg, match) => this.transferCommand.onText(msg));
    this.api.onText(/^\/(help|ayuda)/i, (msg, match) => this.helpCommand.onText(msg));
  }

  reply(msg: Message, translationKey: translationKeys, options?: SendMessageOptions, args?: {}) {
    this.api.sendMessage(
      msg.chat.id,
      this.languageHandler.getTranslation(msg, translationKey, args),
      { parse_mode: "HTML", disable_web_page_preview: true, ...options }
    );
  }

  replyWithMessageID(
    msg: Message,
    translationKey: translationKeys,
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
      Object.keys(handlerData).forEach((key: keyof BotReplyToMessageIdHandlerStorageKeys) => {
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

  getTranslation(msg: Message, translationKey: translationKeys, args?: {}) {
    return this.languageHandler.getTranslation(msg, translationKey, args);
  }

  public clearCommandHandler(chat_id: number) {
    return this.replyToMessageIDMap.delete(chat_id);
  }

  public getReplyToMessageIdHandler(chat_id: number) {
    return this.replyToMessageIDMap.get(chat_id);
  }
}
