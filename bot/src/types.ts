import { CreateWalletCommand, StartCommand, TopUpCommand } from "./commands";
import { SetCountryCodeCommand, SetCurrencyCodeCommand } from "./commands/wallet";

export type Commands =
  | StartCommand
  | CreateWalletCommand
  | TopUpCommand
  | SetCountryCodeCommand
  | SetCurrencyCodeCommand;
