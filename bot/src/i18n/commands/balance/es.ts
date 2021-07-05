import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.command_text_balance]: `
El balance de tu billetera de Rapyd en {{currencyCode}} a partir de {{currentDate}}:

Reserva: {{reserveBalance}}
Recibido: {{receivedBalance}}
En Espera: {{onHoldBalance}}
Balance Actual: {{currentBalance}}
  `,
  [translationKeys.walletbalance_command_error_ewallet_does_not_have_balances]: `
Tu billetera no tiene ningún movimiento aún... 🤠🏜,

Recárgala utilizando <strong>/recarga</strong> e intenta de nuevo.
`,
};
