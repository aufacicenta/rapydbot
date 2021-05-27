import { Bot } from "../Bot";
import { Commands } from "../types";

export class BotReplyToMessageIdHandler {
  id: number;
  reply_to_message_ids: Array<number> = [];
  command: Commands;
  timestamp: Date;
  bot: Bot;

  storage: Map<string, any> = new Map();

  constructor(bot: Bot, command: Commands) {
    this.bot = bot;
    this.command = command;
    this.timestamp = new Date();
  }

  selfDestruct() {
    this.bot.replyToMessageIDMap.delete(this.id);
  }
}
