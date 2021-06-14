import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.setcountry_command_reply]: `Please select a <strong>country</strong> from the list.

This will display the corresponding deposit options in the checkout page.


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
  [translationKeys.setcountry_command_on_country_select_reply]: `Done!

Your Rapyd e-wallet is now set to use {{countryName}} and {{currencyCode}} as currency.

Change these settings anytime with /setcountry & /setcurrency.

You can now /topup your wallet 💪


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
};
