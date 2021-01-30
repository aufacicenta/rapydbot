import { translationKeys } from "./translationKeys";

export const en = {
  translation: {
    [translationKeys.passport_data_process_encrypted_data_success]: `Your information is being processed.

We'll let you know about the status of your approval in the next 24 hrs.

🔒 _Your information is secured with Telegram's MTProto encryption_.`,
    [translationKeys.buy_command_invalid_currency]: `The /buy command works like this:

<strong>/buy [BTC or ETH] [amount]</strong>

The <u>available currencies</u> are: <u>BTC and ETH</u>.`,
    [translationKeys.buy_command_invalid_amount]: `The /buy command works like this:

<strong>/buy [BTC or ETH] [amount]</strong>

Did you forget the <u>amount</u>?`,
    [translationKeys.buy_command_tx_breakdown]: `Here's your quote:

Price {{currency_pair}}
<strong>{{price}}</strong>

Exchange Rate ({{exchange_rate_currency}} {{exchange_rate_amount}})
<strong>{{exchange_rate_result}}</strong>

Fee ({{fee}} + IVA)
<strong>{{fee_result}}</strong>

———
TOTAL
<strong>{{total_result}}</strong>


Please pay {{total_result}} to this bank account:

Bank
<strong>{{bank_name}}</strong>

Account No.
<strong>{{bank_account_number}}, {{bank_account_type}}</strong>

Beneficiary
<strong>{{beneficiary}}</strong>



<em>*The price quote is subject to change between the time the purchase is confirmed.</em>
`,
    [translationKeys.buy_command_inline_markup_text_send_tx_id]: `Send Transaction ID`,
    [translationKeys.buy_command_inline_markup_text_attach_purchase_bank_note]: `Attach Payment Receipt`,
  },
};
