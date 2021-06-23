import { KeyboardButton } from "node-telegram-bot-api";

export function generateTelegramButtons(buttonsQty: number): Array<KeyboardButton> {
  const telegramButtons = Array(buttonsQty)
    .fill({ text: "test" })
    .map((button, i) => {
      return { text: `${button.text} ${i}` };
    });

  return telegramButtons;
}
