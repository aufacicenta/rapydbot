import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.wallet_command_empty_option]: `Call the /wallet command with one of these options:`,
  [translationKeys.wallet_command_option_text_create]: `/wallet create`,
  [translationKeys.wallet_command_option_text_balance]: `/wallet balance`,
  [translationKeys.wallet_command_option_text_top_up]: `/wallet top-up`,
  [translationKeys.wallet_command_option_text_help]: `/wallet help`,
  [translationKeys.wallet_command_option_create]: `Done!

For reference, your e-wallet address is {{e_wallet_address}}, and it is linked to your Telegram username: @{{username}}.

Now, You can top-up your /wallet with a bank transfer, a cash deposit or a card payment using the /wallet top-up command!

You can do it yourself or share the link generated with someone else.

If you want to know what else you can do with your new wallet, use the /wallet help command.

<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
};
