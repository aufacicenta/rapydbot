import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.buy_command_invalid_currency]: `The /buy command works like this:

<strong>/buy [BTC or ETH] [amount]</strong>

The <u>available currencies</u> are: <u>BTC and ETH</u>.`,
  [translationKeys.buy_command_invalid_amount]: `The /buy command works like this:

<strong>/buy [BTC or ETH] [amount]</strong>

Did you forget the <u>amount</u>?`,
  [translationKeys.buy_command_request_amount]: `Ok. How much?`,
  [translationKeys.buy_command_request_currency]: `What currency?`,
  [translationKeys.buy_command_get_sell_orders_error]: `😖 Something went wrong. Try again?`,
  [translationKeys.buy_command_sell_orders]: `These users are selling right now:

{{sell_orders_formatted}}
<em>Negotiate under your own risk. aufaxbot limits itself to connecting buyers with sellers.</em>
`,
};
