import createwallet_command_es from "./commands/createwallet/es";
import start_command_es from "./commands/start/es";
import topup_command_es from "./commands/topup/es";
import wallet_command_es from "./commands/wallet/es";

export const es = {
  translation: {
    ...start_command_es,
    ...createwallet_command_es,
    ...topup_command_es,
    ...wallet_command_es,
  },
};
