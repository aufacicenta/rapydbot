import { Message } from "node-telegram-bot-api";
import { AufaXBot } from "../AufaXBot";
import { IBotCommand } from "./IBotCommand";

export class StartCommand implements IBotCommand {
  private bot: AufaXBot;

  constructor(bot: AufaXBot) {
    this.bot = bot;
  }

  onText(msg: Message) {}
}
