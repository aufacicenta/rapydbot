import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.start_command_intro]: `Welcome to the Aufa X Bot experience.

Sell & Buy cryptocurrencies with easy commands:


The /buy command works like this:

<code>/buy [amount] [currency]</code>
<code>/buy [amount] [from_currency/to_currency]</code>


Example:

To buy BTC for any other currency:
<code>/buy 0.123 BTC</code>

To buy BTC only for USD
<code>/buy 1 BTC/USD</code>

---

The /sell command works like this:

<code>/sell [amount] [currency]</code>
<code>/sell [amount] [from_currency/to_currency]</code>


Example:

To sell BTC for any other currency:
<code>/sell 0.123 BTC</code>

To sell BTC only for USD
<code>/sell 1 BTC/USD</code>



<em>Negotiate under your own risk. aufaxbot limits itself to connect buyers with sellers.</em>`,
};
