import createwallet_command_en from "./commands/createwallet/en";
import start_command_en from "./commands/start/en";
import topup_command_en from "./commands/topup/en";
import wallet_command_en from "./commands/wallet/en";

export const en = {
  translation: {
    ...start_command_en,
    ...createwallet_command_en,
    ...topup_command_en,
    ...wallet_command_en,
  },
};
