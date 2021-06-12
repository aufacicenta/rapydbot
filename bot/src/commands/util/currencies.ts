import { KeyboardButton } from "node-telegram-bot-api";
import Countries from "../../lib/data/countries.json";
import { generateButtonGroups, generateCountryFlagEmoji } from "./buttons";

export function getCurrencyButtons() {
  const currencyButtonsInfo = Countries.map((countryInfo) => {
    const currencyCode = countryInfo.currency_code;

    const twoLettersCountryCode = countryInfo.iso_alpha2;
    const countryFlagEmoji = generateCountryFlagEmoji(twoLettersCountryCode);

    const currencyTelegramButton = {
      text: `${currencyCode} ${countryFlagEmoji}`,
    } as KeyboardButton;

    return currencyTelegramButton;
  });

  const currencyButtons = generateButtonGroups({
    buttonsInfo: currencyButtonsInfo,
    groupSize: 2,
  });

  return currencyButtons;
}

export function getCountryCodeWithoutFlag({
  countryCode,
}: {
  countryCode: string;
}): string | null {
  const countryCodeWithoutFlag = countryCode.split(" ").shift();

  return Boolean(countryCodeWithoutFlag) ? countryCodeWithoutFlag : null;
}
