import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.wallet_command_empty_option]: `Utiliza el comando /billetera con una de estas opciones:`,
  [translationKeys.wallet_command_option_text_create]: `/billetera crear`,
  [translationKeys.wallet_command_option_text_balance]: `/billetera saldo`,
  [translationKeys.wallet_command_option_create]: `Listo!

La dirección de tu e-wallet es {{e_wallet_address}}, y está vinculada a tu usuario de Telegram: @{{username}}.

Ahora, recarga saldo en tu /wallet de manera segura con una transferencia bancaria, un depósito en efectivo o un pago con tarjeta en esta <a href="{{checkout_page_url}}">página de checkout</a>.


<em>Tus transacciones están protegidas por la red de Rapyd. Más información en <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
};
