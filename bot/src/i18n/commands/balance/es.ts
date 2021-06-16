import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.command_text_balance]: `
    Tu Balance En {{currencyCode}} A Partir De {{currentDate}}:
      Balance Actual: {{currentBalance}}
      En Espera:         {{onHoldBalance}}
      Reserva:         {{reserveBalance}}
      Recibido:        {{receivedBalance}}
  `,
  [translationKeys.walletbalance_command_error_ewallet_does_not_have_balances]: `
Tu billetera no tiene ningun movimiento aún... 🤠🏜, 
Recargala utilizando <strong>/recarga</strong> e intenta de nuevo.
`,
};
