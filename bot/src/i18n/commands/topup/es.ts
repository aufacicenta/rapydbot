import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.topup_command_checkout_page_button_text]: `Recargar {{amount}}`,
  [translationKeys.topup_command_amount_reply]: `Entendido.

¿Qué cantidad?


<em>Tus transacciones están protegidas por la red de Rapyd. Más información en <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>,
  `,
  [translationKeys.topup_command_checkout_page_reply]: `Esta no es una cantidad válida.

¿Intenta de nuevo?


<em>Tus transacciones están protegidas por la red de Rapyd. Más información en <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>,
  `,
  [translationKeys.topup_command_checkout_page_reply]: `Visita esta página de pago para cargar saldo a tu billetera.


<em>Tus transacciones están protegidas por la red de Rapyd. Más información en <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>,
  `,
  [translationKeys.command_missing_country]: `
Parece que no has configurado tu país aún... 🪐👽 
  
Configúralo con <strong>/fijarpais</strong> e intenta de nuevo.
`,

  [translationKeys.command_missing_currency]: `
Parece que no has configurado tu moneda aún... 💸💰
  
Configúrala con <strong>/fijarmoneda</strong> e intenta de nuevo.
`,
};
