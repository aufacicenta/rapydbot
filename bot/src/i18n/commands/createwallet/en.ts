import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.createwallet_command_reply]: `Done!

For reference, your e-wallet address is {{e_wallet_address}}, and it is linked to your Telegram username: @{{username}}.

Now set your default <strong>country and currency</strong> with the /setcountry command!

Type /help for more.


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
  [translationKeys.createwallet_command_error_rapyd_ewallet_exists_for_user_id]: `You can only create 1 e-wallet per Telegram username.

Type /help for more.


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>`,
};
