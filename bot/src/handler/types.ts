import { CustomMessage } from "../types";

export type IBotHandler = {
  onText:
    | ((msg: CustomMessage, match?: RegExpMatchArray) => void)
    | ((msg: CustomMessage, match?: RegExpMatchArray) => Promise<void>);
};
