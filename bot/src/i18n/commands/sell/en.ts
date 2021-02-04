import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.sell_command_invalid_currency]: `😖 This currency is not supported.

The /sell command works like this:

<code>/sell [amount] [currency]</code>
<code>/sell [amount] [from_currency/to_currency]</code>


Example:

To sell BTC for any other currency:
<code>/sell 0.123 BTC</code>

To sell BTC only for USD
<code>/sell 1 BTC/USD</code>


<em>/setcountrycode to narrow the options where you are selling.</em>.

<em>Type /help to learn more options.</em>.`,
  [translationKeys.sell_command_invalid_amount]: `The /sell command works like this:

<strong>/sell [amount] [currency]</strong>

Did you forget the <u>amount</u>?`,
  [translationKeys.sell_command_request_amount]: `Ok. How much?`,
  [translationKeys.sell_command_request_currency]: `What currency?`,

  [translationKeys.sell_command_create_tx_error]: `😖 Something went wrong. Try again?`,

  [translationKeys.sell_command_create_tx_success]: `Done! 🎉

Your offer of <u>{{amount}} {{currency}}</u> will expire {{expires_at}}.

Current price: {{price}}
source: {{- price_source}}


<em>Negotiate under your own risk. aufaxbot limits itself to connecting buyers with sellers.</em>`,
};
