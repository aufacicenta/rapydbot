import {
  getCountryButtons,
  getCountryFromName,
} from "../../../../commands/util/buttons/countries";

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
    const gtFullText = "Guatemala π¬πΉ";
    const mxFullText = "Mexico π²π½";
    const svFullText = "El Salvador πΈπ»";
    const abFullText = "Antigua and Barbuda π¦π¬";

    const mxInfo = getCountryFromName(mxFullText);
    const gtInfo = getCountryFromName(gtFullText);
    const svInfo = getCountryFromName(svFullText);
    const abInfo = getCountryFromName(abFullText);

    expect(mxInfo).not.toBeUndefined();
    expect(gtInfo).not.toBeUndefined();
    expect(svInfo).not.toBeUndefined();
    expect(abInfo).not.toBeUndefined();
    expect(mxInfo.name).toBe("Mexico");
    expect(gtInfo.name).toBe("Guatemala");
    expect(svInfo.name).toBe("El Salvador");
    expect(abInfo.name).toBe("Antigua and Barbuda");
    expect(mxInfo.iso_alpha2).toBe("MX");
    expect(gtInfo.iso_alpha2).toBe("GT");
    expect(svInfo.iso_alpha2).toBe("SV");
  });
});
