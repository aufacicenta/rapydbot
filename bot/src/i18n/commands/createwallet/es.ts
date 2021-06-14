import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.createwallet_command_reply]: `Listo!

La dirección de tu e-wallet es {{e_wallet_address}}, y está vinculada a tu usuario de Telegram: @{{username}}.

Ahora, /recarga saldo en tu Billetera de Rapyd de manera segura con una transferencia bancaria, un depósito en efectivo o un pago con tarjeta.

Escribe /ayuda para más opciones.


<em>Tus transacciones están protegidas por la red de Rapyd. Más información en <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
  [translationKeys.createwallet_command_error_rapyd_ewallet_exists_for_user_id]: `Sólo puedes crear una e-wallet por usuario de Telegram.

Escribe /ayuda para más opciones.


<em>Tus transacciones están protegidas por la red de Rapyd. Más información en <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>`,
};
