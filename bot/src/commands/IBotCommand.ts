import { Message } from "node-telegram-bot-api";

export type IBotCommand = {
  onText:
    | ((msg: Message, match?: RegExpMatchArray) => void)
    | ((msg: Message, match?: RegExpMatchArray) => Promise<void>);
};
