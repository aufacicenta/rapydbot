import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.topup_command_checkout_page_button_text]: `Top Up {{amount}}`,
  [translationKeys.topup_command_amount_reply]: `Got it.

What amount?


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
  [translationKeys.topup_command_invalid_amount_reply]: `Uhm. This is not a valid amount.

Try again?


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
  [translationKeys.topup_command_checkout_page_reply]: `Open this secure checkout page to top up your Rapyd e-wallet.



<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
  [translationKeys.command_missing_country]: `
It seems you haven't set your country yet... 🪐👽 

Set it with <strong>/setcountry</strong> and try again.
`,
  [translationKeys.command_missing_currency]: `
It seems you haven't set your currency yet... 💸💰 

Set it with <strong>/setcurrency</strong> and try again.
`,
};
