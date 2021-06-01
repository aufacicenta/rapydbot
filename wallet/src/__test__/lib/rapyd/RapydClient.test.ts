import generateSalt from "../../../lib/crypto/generateSalt";
import RapydClient from "../../../lib/rapyd/RapydClient";
import {
  CreateWalletParams,
  WalletObjectResponse,
} from "../../../lib/rapyd/types";

describe("RapydClient", () => {
  const client = new RapydClient();

  // @TODO mock the Rapyd API
  test("create a Rapyd e_wallet and get back the Rapyd Wallet response", async () => {
    try {
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
    } catch (error) {
      throw error;
    }
  });
});
