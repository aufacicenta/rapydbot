import { getCurrencyButtons, getCurrencyCode } from "../../../commands/util/currencies";

describe("Currency Utilities", () => {
  test("Currency Utilities: Get Currency Buttons", () => {
    const currencyButtons = getCurrencyButtons();

    expect(currencyButtons).not.toBeUndefined();
    expect(currencyButtons.length).not.toBeUndefined();
    expect(currencyButtons[0].length).toBeGreaterThan(0);
    expect(currencyButtons[0][0].text).not.toBeNull();
    expect(currencyButtons[0][0].text).not.toBeUndefined();
  });

  test("Currency Utilities: Get Currency Code", () => {
    const gtCurrencyFullText = "GTQ 🇬🇹";
    const mxCurrencyFullText = "MXN 🇲🇽";

    const mxCurrencyCode = getCurrencyCode(mxCurrencyFullText);
    const gtCurrencyCode = getCurrencyCode(gtCurrencyFullText);

    expect(gtCurrencyCode).not.toBeUndefined();
    expect(mxCurrencyCode).not.toBeUndefined();
    expect(mxCurrencyCode).toBe("MXN");
    expect(gtCurrencyCode).toBe("GTQ");
  });
});
