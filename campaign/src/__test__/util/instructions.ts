import { IntentAction } from "@rapydbot/intent-recognition/providers/cohere/types";

export const instructions = {
  [IntentAction.WalletCreate]: {
    initialInstruction: `¡Bienvenido!

Envía mensajes que representen la instrucción para:

<strong>crear una wallet</strong> ó <strong>crear una billetera</strong>.`,
    reply: `¡Mensaje recibido!

Continúa enviando instrucciones para: <strong>crear una billetera</strong>.`,
  },
  [IntentAction.TransactionsFrom]: {
    initialInstruction: `¡Tiempo! ⏰

Ahora instrucciones para <strong><u>pedir transacciones de alguien hacia ti</u></strong>.

Por ejemplo: <strong>envíame transacciones de Lucía Méndez</strong>.

¡Todo lo que se te ocurra!`,
    reply: `¡Mensaje recibido!

Continúa enviando instrucciones para <strong>saber sobre transacciones de alguien hacia ti</strong>.`,
  },
  [IntentAction.TransactionsWhen]: {
    initialInstruction: `¡Tiempo! ⏰

Ahora instrucciones para <strong><u>pedir transacciones hechas en el pasado</u></strong>.

Por ejemplo: <strong>envíame transacciones del 1 de enero de 2020</strong>.

¡Todo lo que se te ocurra!`,
    reply: `¡Mensaje recibido!

Continúa enviando instrucciones para: <strong>saber sobre transacciones del pasado</strong>.`,
  },
  [IntentAction.TransactionsAmount]: {
    initialInstruction: `¡Tiempo! ⏰

Ahora instrucciones para <strong><u>pedir transacciones de un monto específico</u></strong>.

Por ejemplo: <strong>envíame transacciones de 100 USD</strong>.

¡Todo lo que se te ocurra!`,
    reply: `¡Mensaje recibido!

Continúa enviando instrucciones para: <strong>saber sobre transacciones de un monto específico</strong>.`,
  },
  [IntentAction.CardsCreate]: {
    initialInstruction: `¡Tiempo! ⏰

Ahora instrucciones para <strong><u>crear una tarjeta de débito</u></strong>.

Por ejemplo: <strong>crea una tarjeta de débito de pesos mexicanos, precárgala con 1000</strong>.

¡Todo lo que se te ocurra!`,
    reply: `¡Mensaje recibido!

Continúa enviando instrucciones para: <strong>crear una tarjeta</strong>.`,
  },
  [IntentAction.CardsRead]: {
    initialInstruction: `¡Tiempo! ⏰

Ahora instrucciones para <strong><u>pedir el balance de una tarjeta</u></strong>.

Por ejemplo: <strong>cuál es el balance de mi tarjeta de débito 4556</strong>.

¡Todo lo que se te ocurra!`,
    reply: `¡Mensaje recibido!

Continúa enviando instrucciones para: <strong>saber el balance de una tarjeta</strong>.`,
  },
  [IntentAction.ContactsAdd]: {
    initialInstruction: `¡Tiempo! ⏰

Ahora instrucciones para <strong><u>agregar un contacto y su cuenta bancaria</u></strong>.

Por ejemplo: <strong>agrega a Lucía Méndez con su cuenta bancaria 123456789</strong>.

¡Todo lo que se te ocurra!`,
    reply: `¡Mensaje recibido!

Continúa enviando instrucciones para: <strong>agregar un contacto</strong>.`,
  },
};
