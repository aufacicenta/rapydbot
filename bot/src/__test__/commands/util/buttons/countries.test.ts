import { getCountryButtons, getCountryFromName } from "../../../../commands/util/buttons/countries";

describe("Country Utilities", () => {
  test("Country Utilities: Get Country Buttons", () => {
    const countryButtons = getCountryButtons();

    expect(countryButtons).not.toBeUndefined();
    expect(countryButtons.length).not.toBeUndefined();
    expect(countryButtons[0].length).toBeGreaterThan(0);
    expect(countryButtons[0][0].text).not.toBeNull();
    expect(countryButtons[0][0].text).not.toBeUndefined();
  });

  test("Country Utilities: Get Country From Name", () => {
    const gtFullText = "Guatemala 🇬🇹";
    const mxFullText = "Mexico 🇲🇽";

    const mxInfo = getCountryFromName(mxFullText);
    const gtInfo = getCountryFromName(gtFullText);

    expect(mxInfo).not.toBeUndefined();
    expect(gtInfo).not.toBeUndefined();
    expect(mxInfo.name).toBe("Mexico");
    expect(gtInfo.name).toBe("Guatemala");
    expect(mxInfo.iso_alpha2).toBe("MX");
    expect(gtInfo.iso_alpha2).toBe("GT");
  });
});
