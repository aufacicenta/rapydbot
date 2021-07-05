import balance_command_en from "./commands/balance/en";
import createwallet_command_en from "./commands/createwallet/en";
import help_command_en from "./commands/help/en";
import setcountry_command_en from "./commands/setcountry/en";
import setcurrency_command_en from "./commands/setcurrency/en";
import start_command_en from "./commands/start/en";
import topup_command_en from "./commands/topup/en";
import transfer_command_en from "./commands/transfer/en";

export const en = {
  translation: {
    ...start_command_en,
    ...createwallet_command_en,
    ...topup_command_en,
    ...setcurrency_command_en,
    ...setcountry_command_en,
    ...balance_command_en,
    ...transfer_command_en,
    ...help_command_en,
  },
};
