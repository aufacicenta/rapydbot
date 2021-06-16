import { StartCommand } from "./commands";
import {
  CreateWalletCommand,
  SetCountryCodeCommand,
  SetCurrencyCodeCommand,
  TopUpCommand,
} from "./commands/wallet";

export type Commands =
  | StartCommand
  | CreateWalletCommand
  | TopUpCommand
  | SetCountryCodeCommand
  | SetCurrencyCodeCommand;
