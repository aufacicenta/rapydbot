import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.command_text_balance]: `
    Your Balance In {{currencyCode}} As Of {{currentDate}}:
      Current Balance: {{currentBalance}}
      On Hold:         {{onHoldBalance}}
      Reserve:         {{reserveBalance}}
      Received:        {{receivedBalance}}
  `,
  [translationKeys.walletbalance_command_error_ewallet_does_not_have_balances]: `
    Your wallet doesn't have any activity yet... 🤠🏜, 
    Top-up using <strong>/topup<strong> and try again.
  `,
};
