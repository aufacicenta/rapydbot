import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.balance_command_reply]: `
Your Rapyd e-wallet balance in {{currencyCode}} as of {{currentDate}}:

On Hold: {{onHoldBalance}}
Reserve: {{reserveBalance}}
Received: {{receivedBalance}}
Current Balance: {{currentBalance}}
  `,
  [translationKeys.walletbalance_command_error_ewallet_does_not_have_balances]: `
Your wallet doesn't have any activity yet... 🤠🏜

Top-up using <strong>/topup</strong> and try again.
  `,
};
