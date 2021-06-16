import { KeyboardButton } from "node-telegram-bot-api";

export function generateButtonGroups({
  buttonsInfo,
  groupSize,
}: {
  buttonsInfo: Array<KeyboardButton>;
  groupSize: number;
}): KeyboardButton[][] {
  const buttonGroups = buttonsInfo.reduce((groups, button, index) => {
    const groupIndex = Math.floor(index / groupSize);

    if (!groups[groupIndex]) {
      groups[groupIndex] = [];
    }

    groups[groupIndex].push(button);

    return groups as Array<KeyboardButton>;
  }, []);

  return buttonGroups;
}

export function generateCountryFlagEmoji(twoLettersCountryCode: string) {
  const rootUnicodeFlagsIndex = 127397;

  const codePoints = twoLettersCountryCode
    .split("")
    .map((char, i) => rootUnicodeFlagsIndex + char.charCodeAt(0));

  const flagEmoji = String.fromCodePoint(...codePoints);

  return flagEmoji;
}
