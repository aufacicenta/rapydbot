import { IntentRecognitionClient } from "@rapydbot/intent-recognition/client";
import { UserClient } from "@rapydbot/user/client";
import { WalletClient } from "@rapydbot/wallet/client";
import { Message as TelegramMessage } from "node-telegram-bot-api";
import { Channel, DefaultGenerics, StreamChat, Message as StreamChatMessage } from "stream-chat";

import { StartCommand } from "./commands";
import { TrainCommand } from "./commands/train";
import { CreateWalletCommand } from "./commands/wallet/create";
import { BotLanguageHandler } from "./handler";
import { IntentRecognitionHandler } from "./handler/intent-recognition";

export type CustomMessage = TelegramMessage & {
  context?: {
    chat: {
      message: {
        id: StreamChatMessage["id"];
      };
    };
  };
};

export type Commands = {
  start?: StartCommand;
  train?: TrainCommand;
  createWallet?: CreateWalletCommand;
};

export type Clients = {
  user?: UserClient;
  wallet?: WalletClient;
  intentRecognition?: IntentRecognitionClient;
};

export type Handlers = {
  language?: BotLanguageHandler;
  intentRecognition?: IntentRecognitionHandler;
};

export type Context = {
  chat?: StreamChat<DefaultGenerics>;
  channel?: Channel<DefaultGenerics>;
};
