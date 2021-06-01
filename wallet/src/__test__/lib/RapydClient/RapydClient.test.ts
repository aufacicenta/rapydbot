import { describe, expect, it, jest } from "@jest/globals";
import axios from "axios";
import RapydClient from "../../../../src/lib/rapyd/RapydClient";
import * as CreateWalletRequest from "../../util/request/CreateWallet.json";
import * as CreateWalletReponses from "../../util/response/CreateWallet.json";

jest.mock("axios");

describe("Rapyd API HTTP Client", () => {
  const rapydClient = new RapydClient();

  rapydClient["generateRequestSignature"] = jest
    .fn()
    .mockImplementation(
      (method, path, salt, accessKey, secretKey, body) => "falseSignature"
    ) as any;

  it("Should return a successful response for creating a new wallet", async () => {
    const createWalletSuccessResponse = CreateWalletReponses.responses.success;
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.resolve({ data: { ...createWalletSuccessResponse } })
      );

    const requestBody = CreateWalletRequest.requests.createWallet;
    const responseData = await rapydClient.post<
      typeof createWalletSuccessResponse
    >({
      path: "/v1/wallet",
      body: { ...requestBody },
    });

    expect(responseData.status.status).toBe("SUCCESS");
    expect(responseData.data.id).not.toBe(null);
  });
});
