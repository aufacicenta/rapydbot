import { translationKeys } from "./translationKeys";

export const es = {
  translation: {
    [translationKeys.passport_data_process_encrypted_data_success]: `Recibimos tu información y está siendo procesada.

Te enviaremos un mensaje con los detalles de tu aprobación dentro de las próximas 24 horas.

🔒 _Tu información está protegida con encriptación MTProto_.`,
    [translationKeys.buy_command_invalid_currency]: `El comando /compra funciona así:

<strong>/comprar [BTC ó ETH] [cantidad]</strong>

Las <u>divisas disponibles</u> al momento son: <u>BTC y ETH</u>.`,
    [translationKeys.buy_command_invalid_amount]: `El comando /compra funciona así:

<strong>/comprar [BTC ó ETH] [cantidad]</strong>

¿Olvidaste la <u>cantidad</u>?`,
    [translationKeys.buy_command_inline_markup_text_send_tx_id]: `Enviar ID de la transacción`,
    [translationKeys.buy_command_inline_markup_text_attach_purchase_bank_note]: `Adjuntar recibo de pago`,
  },
};
