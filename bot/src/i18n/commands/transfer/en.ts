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
  [translationKeys.transfer_command_notify_recipient_about_incoming_transfer]: `
@{{senderUsername}} wants to send you {{amount}} {{currency}}.

Accept or reject this transfer by selecting 1 of the options below.


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
`,
  [translationKeys.transfer_command_button_accept]: `Accept`,
  [translationKeys.transfer_command_button_reject]: `Reject`,
  [translationKeys.transfer_command_reply_accept_transfer_request]: `
Good. {{amount}} {{currency}} are being transfered to your Rapyd e-wallet.

I'll notify @{{senderUsername}} about your choice.


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
`,
  [translationKeys.transfer_command_reply_reject_transfer_request]: `
Ok. The money will be sent back to @{{senderUsername}}.


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
`,
  [translationKeys.transfer_command_error_reply_transfer_from_wallet_response_is_not_paid]: `
The transaction is still pending. It should go through soon.

Transaction ID: {{pendingTransactionId}}


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
`,
  [translationKeys.transfer_command_notify_sender_about_accepted_transfer]: `
@{{recipientUsername}} has accepted the transfer of {{amount}} {{currency}}.

Transaction ID: {{pendingTransactionId}}

Check your /balance for more.


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
`,
  [translationKeys.transfer_command_notify_sender_about_rejected_transfer]: `
@{{recipientUsername}} has rejected the transfer of {{amount}} {{currency}}.

Transaction ID: {{pendingTransactionId}}

Check your /balance for more.


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
`,
};
