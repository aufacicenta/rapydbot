import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.start_command_intro]: `Bienvenido a la experiencia Aufa X Bot.

El comando /vender funciona así:

<code>/vender [cantidad] [moneda]</code>
<code>/vender [cantidad] [moneda_origen/moneda_destino]</code>


Ejemplo:

Para vender BTC por cualquier otra moneda:
<code>/vender 0.123 BTC</code>

Para vender BTC contra USD
<code>/vender 1 BTC/USD</code>

---

El comando /comprar funciona así:

<code>/comprar [cantidad] [moneda]</code>
<code>/comprar [cantidad] [moneda_origen/moneda_destino]</code>


Ejemplo:

Para comprar BTC por cualquier otra moneda:
<code>/comprar 0.123 BTC</code>

Para comprar BTC contra USD
<code>/comprar 1 BTC/USD</code>


<em>Negocia bajo tu propio riesgo. Aufa X Bot se milita a conectar compradores con vendedores.</em>`,
};
