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
  [translationKeys.transfer_command_notify_recipient_about_incoming_transfer]: `
@{{senderUsername}} desea enviarte {{amount}} {{currency}}.

Acepta o rechaza esta transferencia seleccionando 1 de las opciones debajo.


<em>Tus transacciones están protegidas por la red de Rapyd. Más información en <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
`,
  [translationKeys.transfer_command_button_accept]: `Aceptar`,
  [translationKeys.transfer_command_button_reject]: `Rechazar`,
  [translationKeys.transfer_command_reply_accept_transfer_request]: `
Entendido. {{amount}} {{currency}} están siendo transferidos a tu billetera de Rapyd.

Notificaré a @{{senderUsername}} acerca de tu aprobación.


<em>Tus transacciones están protegidas por la red de Rapyd. Más información en <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
`,
  [translationKeys.transfer_command_reply_reject_transfer_request]: `
Ok. El dinero será enviado de vuelta a @{{senderUsername}}.


<em>Tus transacciones están protegidas por la red de Rapyd. Más información en <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
`,
  [translationKeys.transfer_command_error_reply_transfer_from_wallet_response_is_not_paid]: `
La transacción aún está pendiente. Deberá realizarse pronto.

ID de la transacción: {{pendingTransactionId}}


<em>Tus transacciones están protegidas por la red de Rapyd. Más información en <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
`,
  [translationKeys.transfer_command_notify_sender_about_accepted_transfer]: `
@{{recipientUsername}} ha aceptado la transferencia de {{amount}} {{currency}}.

ID de la transacción: {{pendingTransactionId}}

Consulta tu /balance para más información.


<em>Tus transacciones están protegidas por la red de Rapyd. Más información en <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
`,
  [translationKeys.transfer_command_notify_sender_about_rejected_transfer]: `
@{{recipientUsername}} ha rechazado la transferencia de {{amount}} {{currency}}.

ID de la transacción: {{pendingTransactionId}}

Consulta tu /balance para más información.


<em>Tus transacciones están protegidas por la red de Rapyd. Más información en <a href="https://www.rapyd.net/platform/protect/">Rapyd Protect</a>.</em>
`,
};
