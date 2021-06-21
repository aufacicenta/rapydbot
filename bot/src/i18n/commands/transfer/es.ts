import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.transfer_command_reply_no_user_no_amount]: `¡Seguro! ¿A qué usuario?`,
  [translationKeys.transfer_command_reply_username_pending_amount]: `¿Qué cantidad?`,
  [translationKeys.transfer_command_reply_confirmation]: `
¡Hecho!

Tu envío de {{amount}} {{currencyCode}} a @{{username}} está siendo procesado.
@{{username}} deberá aceptar la transacción para ser completada.

ID de la transacción: {{pendingTransactionId}}


<em>Tus transacciones están protegidas por la red de Rapyd. Más información en <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
`,
  [translationKeys.transfer_command_reply_amount_error]: `
<em>{{amount}}</em> no es una cantidad válida.

¿Intenta de nuevo?
`,
  [translationKeys.transfer_command_reply_username_not_found_error]: `
@{{username}} no tiene una billetera de Rapyd.

Invítalo a crear una e intenta de nuevo.



<em>Tus transacciones están protegidas por la red de Rapyd. Más información en <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
`,
};
