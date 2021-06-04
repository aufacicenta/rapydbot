import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.createwallet_command_reply]: `Done!

For reference, your e-wallet address is {{e_wallet_address}}, and it is linked to your Telegram username: @{{username}}.

Now you can top-up your Rapyd e-wallet with a bank transfer, a cash deposit or a card payment using the <code>/wallet top-up</code> command!

Type /wallet for more.


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
  [translationKeys.createwallet_command_error_rapyd_ewallet_exists_for_user_id]: `You can only create 1 e-wallet per Telegram username.`,
};
