import start_command_es from "./commands/start/es";
import wallet_command_es from "./commands/wallet/es";

export const es = {
  translation: {
    ...start_command_es,
    ...wallet_command_es,
  },
};
