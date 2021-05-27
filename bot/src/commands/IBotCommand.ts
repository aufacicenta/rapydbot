import { Message } from "node-telegram-bot-api";
import { Bot } from "../Bot";
import { BotReplyToMessageIdHandler } from "../handler";

export interface IBotCommand {
  onText:
    | ((msg: Message, match?: RegExpMatchArray) => void)
    | ((msg: Message, match?: RegExpMatchArray) => Promise<void>);
  onReplyFromMessageID:
    | ((msg: Message, handler: BotReplyToMessageIdHandler, match?: RegExpMatchArray) => void)
    | ((
        msg: Message,
        handler: BotReplyToMessageIdHandler,
        match?: RegExpMatchArray
      ) => Promise<void>);
}

interface IBotCommandConstructor {
  new (bot: Bot);
}
