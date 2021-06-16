import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.setcurrency_command_reply]: `Selecciona una <strong>moneda</strong> de la lista.

Esto mostrará las opciones de pago correspondientes al país en la página de pago.


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
  [translationKeys.setcurrency_command_on_currency_change_reply]: `Listo!

Tu billetera de Rapyd está configurada con la moneda {{currencyCode}}.

Cambia esta configuración en cualquier momento con /fijarmoneda.

<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
};
