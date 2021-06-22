import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.command_text_help]: `
    Puedo ayudarte con la creación y administración
    de tu billetera Rapyd.

    Puedes controlarme enviando cualquiera
    de los siguientes comandos:

    Control de tu Billetera
    <strong>/crearbilletera</strong> - crea una nueva billetera Rapyd
    <strong>/topup</strong> - crea una nueva página de pago para recargar
    tu billetera
    <strong>/enviar</strong> - envía fondos a otros usuarios de telegram
    <strong>/withdraw</strong> - retira efectivo de tu billetera desde cualquier
    punto POS de Rapyd, como cajeros automáticos y tiendas de conveniencia    
    <strong>/balance</strong> - obtén el balance de tu billetera Rapyd

    Configuración de tu Billetera
    <strong>/fijarpais</strong> - fija tu información de país predeterminada
    <strong>/fijarmoneda</strong> - fija tu información de moneda predeterminada
  `,
};
