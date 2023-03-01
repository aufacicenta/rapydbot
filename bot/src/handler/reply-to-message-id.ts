import { TGInformerBot } from "../tg-informer";
import { Commands } from "../types";

export type BotReplyToMessageIdHandlerStorageKeys = {
  previousText?: string;
  username?: string;
  senderUsername?: string;
  amount?: string;
  currency?: string;
  recipientUserId?: string;
  senderUserId?: string;
  pendingTransactionId?: string;
};

export class BotReplyToMessageIdHandler {
  id: number;
  reply_to_message_ids: Array<number> = [];
  command: Commands;
  timestamp: Date;
  bot: TGInformerBot;

  storage: Map<keyof BotReplyToMessageIdHandlerStorageKeys, any> = new Map();

  constructor(bot: TGInformerBot, command: Commands) {
    this.bot = bot;
    this.command = command;
    this.timestamp = new Date();
  }

  selfDestruct() {
    this.bot.replyToMessageIDMap.delete(this.id);
  }
}
