import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.transfer_command_reply_no_user_no_amount]: `Sure! To what user?`,
  [translationKeys.transfer_command_reply_username_pending_amount]: `Right. What amount?`,
  [translationKeys.transfer_command_reply_confirmation]: `
Done!

Your transaction of {{amount}} {{currencyCode}} to @{{username}} is being processed.
@{{username}} needs to accept the transaction to be completed.

Transaction ID: {{pendingTransactionId}}


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
`,
  [translationKeys.transfer_command_reply_amount_error]: `
<em>{{amount}}</em> is not a valid amount.

Try again?
`,
  [translationKeys.transfer_command_reply_username_not_found_error]: `
@{{username}} does not have a Rapyd e-wallet.

Tell your friends to create one with /createwallet and try again.


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
`,
};
