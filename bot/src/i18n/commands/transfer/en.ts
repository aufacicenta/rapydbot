import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.transfer_command_reply_no_user_no_amount]: `Sure! To what user?`,
  [translationKeys.transfer_command_reply_username_pending_amount]: `Right. What amount?`,
  [translationKeys.transfer_command_reply_confirmation]: `
Done!

Your transaction of {{amount}} {{currencyCode}} to @{{username}} is being processed.
I'll let you know when it's done.


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
`,
  [translationKeys.transfer_command_reply_amount_error]: `
<em>{{amount}}</em> is not a valid amount.

Try again?
`,
};
