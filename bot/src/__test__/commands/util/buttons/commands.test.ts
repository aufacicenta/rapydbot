import { getCommandButtons } from "../../../../commands/util/buttons/commands";

describe("Command Buttons Utility", () => {
  test("Command Buttons: Get Command Buttons", () => {
    const commandButtons = getCommandButtons({
      commandButtonsString: `
        [
          {"text":"/createwallet"},
          {"text":"/topup"},
          {"text":"/balance"},
          {"text":"/send"},
          {"text":"/withdraw"},
          {"text":"/setcountry"},
          {"text":"/setcurrency"}
      ]`,
    });

    expect(commandButtons).not.toBeUndefined();
    expect(commandButtons.length).not.toBeUndefined();
    expect(commandButtons[0].length).toBeGreaterThan(0);
    expect(commandButtons[0][0].text).not.toBeNull();
    expect(commandButtons[0][0].text).not.toBeUndefined();
  });
});
