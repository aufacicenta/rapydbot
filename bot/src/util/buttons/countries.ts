import { KeyboardButton } from "node-telegram-bot-api";

import Countries from "../../lib/data/countries.json";

import { generateButtonGroups, generateCountryFlagEmoji } from "./button-groups";

export function getCountryButtons() {
  const countryButtonsInfo = Countries.map((countryInfo) => {
    const twoLettersCountryCode = countryInfo.iso_alpha2;
    const countryName = countryInfo.name;
    const countryFlagEmoji = generateCountryFlagEmoji(twoLettersCountryCode);

    const countryTelegramButton = {
      text: `${countryName} ${countryFlagEmoji}`,
    } as KeyboardButton;

    return countryTelegramButton;
  });

  const countryButtons = generateButtonGroups({
    buttonsInfo: countryButtonsInfo,
    groupSize: 1,
  });

  return countryButtons;
}

export function getCountryFromName(countryName: string): (typeof Countries)[number] | null {
  const countryByName = Countries.filter(({ name }) => {
    const countryNamePieces = countryName.split(" ");

    if (Boolean(countryNamePieces.length > 2)) {
      const namePiecesWithoutFlag = countryNamePieces.slice(0, -1).join(" ");

      return namePiecesWithoutFlag === name;
    } else {
      return countryNamePieces.shift() === name;
    }
  }).shift();

  if (!Boolean(countryByName)) return null;

  return countryByName;
}
