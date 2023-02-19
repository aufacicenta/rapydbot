import { CustomMessage } from "../types";

export type IBotCommand = {
  onText:
    | ((msg: CustomMessage, match?: RegExpMatchArray) => void)
    | ((msg: CustomMessage, match?: RegExpMatchArray) => Promise<void>);
};
