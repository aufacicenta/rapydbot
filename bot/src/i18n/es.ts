import balance_command_es from "./commands/balance/es";
import createwallet_command_es from "./commands/createwallet/es";
import help_command_es from "./commands/help/es";
import setcountry_command_es from "./commands/setcountry/es";
import setcurrency_command_es from "./commands/setcurrency/es";
import start_command_es from "./commands/start/es";
import topup_command_es from "./commands/topup/es";
import transfer_command_es from "./commands/transfer/es";

export const es = {
  translation: {
    ...start_command_es,
    ...createwallet_command_es,
    ...topup_command_es,
    ...setcurrency_command_es,
    ...setcountry_command_es,
    ...balance_command_es,
    ...transfer_command_es,
    ...help_command_es,
  },
};
