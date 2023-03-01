import { CampaignClient } from "@rapydbot/campaign";
import { IntentRecognitionClient } from "@rapydbot/intent-recognition/client";
import { UserModelAttributes, UserClient } from "@rapydbot/user";
import { WalletClient } from "@rapydbot/wallet/client";
import { Message as TelegramMessage } from "node-telegram-bot-api";
import { Channel, DefaultGenerics, StreamChat, MessageResponse } from "stream-chat";

import { StartCommand } from "./commands";
import { TrainCommand } from "./commands/train";
import { CreateWalletCommand } from "./commands/wallet/create";
import { BotLanguageHandler } from "./handler";
import { ContextHandler } from "./handler/context";
import { IntentRecognitionHandler } from "./handler/intent-recognition";

export type CustomMessage = TelegramMessage & {
  user?: {
    id: UserModelAttributes["id"];
  };
  context?: {
    chat: {
      message: MessageResponse<DefaultGenerics> | { id: string };
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
  campaign?: CampaignClient;
};

export type Handlers = {
  language?: BotLanguageHandler;
  intentRecognition?: IntentRecognitionHandler;
  context?: ContextHandler;
};

export type Context = {
  chat?: StreamChat<DefaultGenerics>;
  channel?: Channel<DefaultGenerics>;
};
