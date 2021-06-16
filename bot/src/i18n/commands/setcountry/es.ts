import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.setcountry_command_reply]: `Selecciona un <strong>país</strong> de la lista.

Esto mostrará las opciones de pago correspondientes al país en la página de pago.


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
  [translationKeys.setcountry_command_on_country_select_reply]: `Done!

Tu billetera de Rapyd está configurada en {{countryName}} con la moneda {{currencyCode}}.

Cambia esta configuración en cualquier momento con /fijarpais y /fijarmoneda.

Ahora, /recarga tu billetera 💪


<em>Your transactions are secured by <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
  `,
};
