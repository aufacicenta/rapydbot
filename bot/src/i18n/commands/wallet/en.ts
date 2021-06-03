import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.wallet_command_empty_option]: `Call the /wallet command with one of these options:`,
  [translationKeys.wallet_command_option_text_create]: `/wallet create`,
  [translationKeys.wallet_command_option_text_balance]: `/wallet balance`,
  [translationKeys.wallet_command_option_text_top_up]: `/wallet top-up`,
  [translationKeys.wallet_command_option_text_top_up]: `/wallet top-up`,
  [translationKeys.wallet_command_button_text_top_up]: `Top Up Wallet`,
  [translationKeys.wallet_command_option_text_help]: `/wallet help`,
  [translationKeys.wallet_command_error_rapyd_ewallet_exists_for_user_id]: `You can only create 1 e-wallet per Telegram username.

Type /wallet for more.
  `,
  [translationKeys.wallet_command_option_create]: `Done!

For reference, your e-wallet address is {{e_wallet_address}}, and it is linked to your Telegram username: @{{username}}.

Now you can top-up your Rapyd e-wallet with a bank transfer, a cash deposit or a card payment using the <code>/wallet top-up</code> command!

Type /wallet for more.


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
};
