import { CustomMessage } from "../types";

export type OnTextOptions = {
  isCommand?: boolean;
};

export type IBotCommand = {
  onText:
    | ((msg: CustomMessage, options?: OnTextOptions, match?: RegExpMatchArray) => void)
    | ((msg: CustomMessage, options?: OnTextOptions, match?: RegExpMatchArray) => Promise<void>);
};
