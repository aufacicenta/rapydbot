import {
  generateButtonGroups,
  generateCountryFlagEmoji,
} from "../../../../util/buttons/button-groups";
import { generateTelegramButtons } from "../../../util";

describe("Button Utilities", () => {
  test("Button Utilities: Generate Button Pair Groups", () => {
    const buttons = generateTelegramButtons(8);
    const buttonGroups = generateButtonGroups({
      buttonsInfo: buttons,
      groupSize: 2,
    });

    expect(buttonGroups.length).toBe(4);
    expect(buttonGroups[0].length).toBe(2);
    expect(buttonGroups[0][0]).not.toBe(undefined);
  });

  test("Button Utilities: Generate Button Odd Groups", () => {
    const buttons = generateTelegramButtons(10);
    const buttonGroups = generateButtonGroups({
      buttonsInfo: buttons,
      groupSize: 3,
    });

    const lastButtonGroupIndex = buttonGroups.length - 1;

    expect(buttonGroups.length).toBe(4);
    expect(buttonGroups[0].length).toBe(3);
    expect(buttonGroups[lastButtonGroupIndex].length).toBe(1);
    expect(buttonGroups[lastButtonGroupIndex][0]).not.toBe(undefined);
  });

  test("Button Utilities: Generate Flag Emojis", () => {
    const mxExpectedFlagEmoji = "🇲🇽";
    const gtExpectedFlagEmoji = "🇬🇹";

    const mxFlagEmoji = generateCountryFlagEmoji("MX");
    const gtFlagEmoji = generateCountryFlagEmoji("GT");

    expect(mxFlagEmoji).toBe(mxExpectedFlagEmoji);
    expect(gtFlagEmoji).toBe(gtExpectedFlagEmoji);
  });
});
