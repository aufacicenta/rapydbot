import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.buy_command_invalid_currency]: `😖 No soportamos esta moneda, aún.

El comando /comprar funciona así:

<code>/comprar [cantidad] [moneda]</code>
<code>/comprar [cantidad] [moneda_origen/moneda_destino]</code>


Ejemplo:

Para comprar BTC por cualquier otra moneda:
<code>/comprar 0.123 BTC</code>

Para comprar BTC contra USD
<code>/comprar 1 BTC/USD</code>`,
  [translationKeys.buy_command_invalid_amount]: `El comando /comprar funciona así:

<strong>/comprar [cantidad] [moneda_origen/moneda_destino]</strong>

¿Olvidaste la <u>cantidad</u>?`,
  [translationKeys.buy_command_request_amount]: `Ok. ¿Cuánto?`,
  [translationKeys.buy_command_request_currency]: `¿Qué moneda?`,
  [translationKeys.buy_command_get_sell_orders_error]: `😖 Algo falló. Intenta de nuevo.`,
  [translationKeys.buy_command_sell_orders]: `Estos usuarios están vendiendo ahora mismo:

{{sell_orders_formatted}}
Precio actual: {{price}}
Fuente: {{- price_source}}

<em>Negocia bajo tu propio riesgo. Aufa X Bot se milita a conectar compradores con vendedores.</em>
`,
};
