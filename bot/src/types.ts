import { CreateWalletCommand, StartCommand, TopUpCommand } from "./commands";

export type Commands = StartCommand | CreateWalletCommand | TopUpCommand;
