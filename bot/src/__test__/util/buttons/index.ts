import { KeyboardButton } from "node-telegram-bot-api";

export function generateTelegramButtons(
  buttonsQty: number
): Array<KeyboardButton> {
  const telegramButtons = Array(buttonsQty)
    .fill({ text: "test" })
    .map((button, i) => {
      return { text: `${button.text} ${i}` };
    });

  return telegramButtons;
}

export function getCommandButtonsTranslation({
  language,
}: {
  language: string;
}) {
  if (language === "es") {
    return `
    [
      {"text":"/crearbilletera"},
      {"text":"/recargar"},
      {"text":"/balance"},
      {"text":"/enviar"},
      {"text":"/retirar"},
      {"text":"/fijarpais"},
      {"text":"/fijarmoneda"}
   ]`;
  } else {
    return `
    [
      {"text":"/createwallet"},
      {"text":"/topup"},
      {"text":"/balance"},
      {"text":"/send"},
      {"text":"/withdraw"},
      {"text":"/setcountry"},
      {"text":"/setcurrency"}
   ]`;
  }
}
