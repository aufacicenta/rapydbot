import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.createwallet_command_reply]: `Listo!

La dirección de tu e-wallet es {{e_wallet_address}}, y está vinculada a tu usuario de Telegram: @{{username}}.

Ahora, utiliza el comando /fijarpais para establecer el <strong>país y la moneda</strong> de tu billetera de Rapyd.

Escribe /ayuda para más opciones.


<em>Tus transacciones están protegidas por la red de Rapyd. Más información en <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
  [translationKeys.createwallet_command_error_rapyd_ewallet_exists_for_user_id]: `Sólo puedes crear una e-wallet por usuario de Telegram.

Escribe /ayuda para más opciones.


<em>Tus transacciones están protegidas por la red de Rapyd. Más información en <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>`,
};
