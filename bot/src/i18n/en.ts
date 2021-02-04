import buy_command_en from "./commands/buy/en";
import sell_command_en from "./commands/sell/en";
import { translationKeys } from "./translationKeys";

export const en = {
  translation: {
    ...buy_command_en,
    ...sell_command_en,

    [translationKeys.passport_data_process_encrypted_data_success]: `Your information is being processed.

We'll let you know about the status of your approval in the next 24 hrs.

🔒 _Your information is secured with Telegram's MTProto encryption_.`,
  },
};
