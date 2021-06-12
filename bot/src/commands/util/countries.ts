import { KeyboardButton } from "node-telegram-bot-api";
import Countries from "../../lib/data/countries.json";
import { generateButtonGroups, generateCountryFlagEmoji } from "./buttons";

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

export function getCountryCodeFromName({
  countryName,
}: {
  countryName: string;
}): string | null {
  const countryByName = Countries.filter(({ name }) => {
    const countryNameWhithoutFlag = countryName.split(" ").shift();

    return countryNameWhithoutFlag === name;
  }).shift();

  if (!Boolean(countryByName)) return null;

  const { iso_alpha2: countryCode } = countryByName;

  return countryCode;
}
