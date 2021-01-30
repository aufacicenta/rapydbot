import { Message } from "node-telegram-bot-api";
import { AufaXBot } from "../AufaXBot";

export interface IBotCommand {
  onText:
    | ((msg: Message, match?: RegExpMatchArray) => void)
    | ((msg: Message, match?: RegExpMatchArray) => Promise<void>);
}

interface IBotCommandConstructor {
  new (bot: AufaXBot);
}
