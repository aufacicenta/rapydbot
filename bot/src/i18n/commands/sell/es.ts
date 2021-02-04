import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.sell_command_invalid_currency]: `😖 No es posible publicar esta moneda, aún.

El comando /vender funciona así:

<code>/vender [cantidad] [moneda]</code>
<code>/vender [cantidad] [moneda_origen/moneda_destino]</code>


Ejemplo:

Para vender BTC por cualquier otra moneda:
<code>/vender 0.123 BTC</code>

Para vender BTC contra USD
<code>/vender 1 BTC/USD</code>`,
  [translationKeys.sell_command_invalid_amount]: `El comando /vender funciona así:

<strong>/vender [cantidad] [moneda]</strong>

Olvidaste la <u>cantidad</u>?`,
  [translationKeys.sell_command_request_amount]: `Ok. ¿Cuánto?`,
  [translationKeys.sell_command_request_currency]: `¿Qué moneda?`,
  [translationKeys.sell_command_create_tx_error]: `😖 Algo falló. Intenta de nuevo.`,
  [translationKeys.sell_command_create_tx_success]: `!Hecho! 🎉

Tu oferta de <u>{{amount}} {{currency}}</u> expirará {{expires_at}}.

Precio actual: {{price}}
Fuente: {{- price_source}}

<em>Negocia bajo tu propio riesgo. Aufa X Bot se milita a conectar compradores con vendedores.</em>`,
};
