import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.wallet_command_empty_option]: `Call the /wallet command with one of these options:`,
  [translationKeys.wallet_command_option_text_create]: `/wallet create`,
  [translationKeys.wallet_command_option_text_balance]: `/wallet balance`,
  [translationKeys.wallet_command_option_create]: `Done!

For reference, your e-wallet address is {{e_wallet_address}}, and it is linked to your Telegram username: @{{username}}.

Now, let's top-up your /wallet with a bank transfer, a cash deposit or a card payment in this <a href="{{checkout_page_url}}">secure checkout page</a>!


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
};
