import generateSalt from "../../../providers/crypto/generateSalt";
import RapydClient from "../../../providers/rapyd/client";
import {
  CreateWalletParams,
  WalletObjectResponse,
} from "../../../providers/rapyd/types";
import { WalletServiceErrorCodes } from "../../../service/error";

describe("RapydClient", () => {
  const client = new RapydClient();

  // @TODO mock the Rapyd API when we implement CI/CD, otherwise make tests against the Sandbox API to be clear about Rapyd responses
  test("create a Rapyd e_wallet and get back the Rapyd Wallet response", async () => {
    const ewallet_reference_id = `tg_username_id_${generateSalt()}`;

    const data = await client.post<WalletObjectResponse, CreateWalletParams>({
      path: "/v1/user",
      body: {
        ewallet_reference_id,
      },
    });

    expect(data.ewallet_reference_id).toEqual(ewallet_reference_id);
    expect(data.id).toBeTruthy();
    expect(data.type).toEqual("person");
  });

  test("create a Rapyd e_wallet and fail with ERROR_CREATE_USER_EWALLET_REFERENCE_ID_ALREADY_EXISTS error code", async () => {
    try {
      const ewallet_reference_id = `tg_username_id`;

      await client.post<WalletObjectResponse, CreateWalletParams>({
        path: "/v1/user",
        body: {
          ewallet_reference_id,
        },
      });
    } catch (error) {
      expect((error as any).response.data.status.error_code).toEqual(
        WalletServiceErrorCodes.ERROR_CREATE_USER_EWALLET_REFERENCE_ID_ALREADY_EXISTS
      );
    }
  });
});
