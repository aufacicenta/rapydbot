import { getCommandButtons } from "../../../../commands/util/buttons/commands";
import { getCommandButtonsTranslation } from "../../../util";

describe("Command Buttons Utility", () => {
  test("Command Buttons: Get Command Buttons", () => {
    const commandButtonsString = getCommandButtonsTranslation({
      language: "es",
    });
    const commandButtons = getCommandButtons({ commandButtonsString });

    expect(commandButtons).not.toBeUndefined();
    expect(commandButtons.length).not.toBeUndefined();
    expect(commandButtons[0].length).toBeGreaterThan(0);
    expect(commandButtons[0][0].text).not.toBeNull();
    expect(commandButtons[0][0].text).not.toBeUndefined();
  });
});
