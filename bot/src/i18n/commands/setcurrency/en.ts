import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.setcurrency_command_reply]: `Please select a <strong>currency</strong> from the list.

This will display the corresponding deposit options in the checkout page.


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
  [translationKeys.setcurrency_command_on_currency_change_reply]: `Done!

Your Rapyd e-wallet is now set to use {{currencyCode}} as currency.

Change these settings anytime with /setcurrency.

<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
};
