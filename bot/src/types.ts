import { StartCommand } from "./commands";
import {
  CreateWalletCommand,
  SetCountryCodeCommand,
  SetCurrencyCodeCommand,
  TopUpCommand,
  TransferCommand,
} from "./commands/wallet";

export type Commands =
  | StartCommand
  | CreateWalletCommand
  | TopUpCommand
  | SetCountryCodeCommand
  | SetCurrencyCodeCommand
  | TransferCommand;
