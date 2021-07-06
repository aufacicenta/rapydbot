import { WalletServiceErrorCodes } from "../../../../../wallet/build/service/error";
import { containsErrorCode } from "../../../commands/util/errorHandling";

describe("Error Handling Utilities", () => {
  test("Contains Error Code Utility", () => {
    const {
      rapyd_ewallet_does_not_have_an_established_country: missing_country,
      rapyd_ewallet_does_not_have_an_established_currency: missing_currency,
    } = WalletServiceErrorCodes;

    const missingCurrencyError = new Error(missing_currency);
    const missingCountryError = new Error(missing_country);
    const missingCountryNoisyError = new Error(
      `noise ${missing_country} noise`
    );
    const layerEightError = new Error("Layer 8 error");

    const { containsCode: currencyCodeIsPresent } = containsErrorCode(
      missingCurrencyError,
      WalletServiceErrorCodes
    );
    const { containsCode: countryCodeIsPresent } = containsErrorCode(
      missingCountryError,
      WalletServiceErrorCodes
    );
    const { containsCode: layer8CodeIsPresent } = containsErrorCode(
      layerEightError,
      WalletServiceErrorCodes
    );
    const { containsCode: codeInNoisyPayload, errorId: noisyErrorId } =
      containsErrorCode(missingCountryNoisyError, WalletServiceErrorCodes);

    expect(countryCodeIsPresent).toBeTruthy();
    expect(currencyCodeIsPresent).toBeTruthy();
    expect(codeInNoisyPayload).toBeTruthy();
    expect(layer8CodeIsPresent).toBeFalsy();
    expect(noisyErrorId).toBe(missing_country);
  });
});
