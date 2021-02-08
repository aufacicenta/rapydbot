import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.buy_command_invalid_currency]: `😖 This currency is not supported.

The /buy command works like this:

<code>/buy [amount] [currency]</code>
<code>/buy [amount] [from_currency/to_currency]</code>


Example:

To buy BTC for any other currency:
<code>/buy 0.123 BTC</code>

To buy BTC only for USD
<code>/buy 1 BTC/USD</code>


<em>/setcountrycode to narrow the options where you are selling.</em>.

<em>Type /help to learn more options.</em>.`,
  [translationKeys.buy_command_invalid_amount]: `The /buy command works like this:

<strong>/buy [BTC or ETH] [amount]</strong>

Did you forget the <u>amount</u>?`,
  [translationKeys.buy_command_request_amount]: `Ok. How much?`,
  [translationKeys.buy_command_request_currency]: `What currency?`,
  [translationKeys.buy_command_get_sell_orders_error]: `😖 Something went wrong. Try again?`,
  [translationKeys.buy_command_sell_orders]: `These users are selling right now:

{{sell_orders_formatted}}
Current price: {{price}}
source: {{- price_source}}

<em>Negotiate under your own risk. aufaxbot limits itself to connect buyers with sellers.</em>
`,
  [translationKeys.buy_command_empty_sell_orders]: `No users are selling this right now. 🤷‍♀️

Current price: {{price}}
Source: {{- price_source}}`,
};
