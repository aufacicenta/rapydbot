import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.command_text_help]: `
Puedo ayudarte con la creación y administración de tu billetera Rapyd.

Puedes controlarme enviando cualquiera de los siguientes comandos:

<b><u>Control de tu Billetera</u></b>
<strong>/crearbilletera</strong> - crea una nueva billetera Rapyd
<strong>/recargar</strong> - crea una nueva página de pago para recargar tu billetera
<strong>/enviar</strong> - envía fondos a otros usuarios de telegram
<strong>/retirar</strong> - retira efectivo de tu billetera desde cualquier punto POS de Rapyd, como cajeros automáticos y tiendas de conveniencia
<strong>/balance</strong> - obtén el balance de tu billetera Rapyd

<b><u>Configuración de tu Billetera</u></b>
<strong>/fijarpais</strong> - fija tu información de país predeterminada
<strong>/fijarmoneda</strong> - fija tu información de moneda predeterminada
  `,
  [translationKeys.help_command_buttons]: `
   [
     {"text":"/crearbilletera"},
     {"text":"/recargar"},
     {"text":"/balance"},
     {"text":"/enviar"},
     {"text":"/retirar"},
     {"text":"/fijarpais"},
     {"text":"/fijarmoneda"}
  ]`,
};
