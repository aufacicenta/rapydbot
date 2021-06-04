import { CreateWalletCommand, StartCommand, WalletCommand } from "./commands";

export type Commands = StartCommand | WalletCommand | CreateWalletCommand;
