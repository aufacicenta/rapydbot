import { Message as TelegramMessage } from "node-telegram-bot-api";
import { Message as StreamChat } from "stream-chat";

import { StartCommand } from "./commands";
import { TrainCommand } from "./commands/train";

export type CustomMessage = TelegramMessage & {
  context?: {
    chat: {
      message: {
        id: StreamChat["id"];
      };
    };
  };
};

export type Commands = {
  start?: StartCommand;
  train?: TrainCommand;
};
