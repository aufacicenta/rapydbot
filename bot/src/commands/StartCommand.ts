import { Message } from "node-telegram-bot-api";
import { AufaXBot } from "../AufaXBot";
import { BotReplyToMessageIdHandler } from "../handler";
import { translationKeys } from "../i18n";
import { IBotCommand } from "./IBotCommand";

export class StartCommand implements IBotCommand {
  private bot: AufaXBot;

  constructor(bot: AufaXBot) {
    this.bot = bot;
  }

  async onReplyFromMessageID(
    msg: Message,
    handler: BotReplyToMessageIdHandler,
    match?: RegExpMatchArray
  ) {}

  onText(msg: Message) {
    this.bot.reply(msg, translationKeys.start_command_intro);
  }
}
