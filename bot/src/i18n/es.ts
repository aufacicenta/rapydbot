import buy_command_es from "./commands/buy/es";
import sell_command_es from "./commands/sell/es";
import start_command_es from "./commands/start/es";
import { translationKeys } from "./translationKeys";

export const es = {
  translation: {
    ...buy_command_es,
    ...sell_command_es,
    ...start_command_es,

    [translationKeys.passport_data_process_encrypted_data_success]: `Recibimos tu información y está siendo procesada.

Te enviaremos un mensaje con los detalles de tu aprobación dentro de las próximas 24 horas.

🔒 _Tu información está protegida con encriptación MTProto_.`,
  },
};
