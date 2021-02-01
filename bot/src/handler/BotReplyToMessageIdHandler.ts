import { AufaXBot } from "../AufaXBot";
import { Commands } from "../types";

export class BotReplyToMessageIdHandler {
  id: number;
  reply_to_message_ids: Array<number> = [];
  command: Commands;
  timestamp: Date;
  bot: AufaXBot;

  storage: Map<string, any> = new Map();

  constructor(bot: AufaXBot, command: Commands) {
    this.bot = bot;
    this.command = command;
    this.timestamp = new Date();
  }

  selfDestruct() {
    this.bot.replyToMessageIDMap.delete(this.id);
  }
}
