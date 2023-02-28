import {
  CreateWalletReply,
  CreateWalletRequest,
  WalletClient,
  WalletClientGenerator,
} from "@rapydbot/wallet/client";
import { WalletObjectResponse } from "@rapydbot/wallet/providers/rapyd/types";

import {
  IntentRecognitionClientGenerator,
  ClassifyRequest,
  ClassifyReply,
  IntentRecognitionClient,
} from "../../client";

let client: IntentRecognitionClient,
  wallet: WalletClientGenerator,
  walletGRPC: WalletClient,
  users: string[];

describe("controller", () => {
  beforeAll(async () => {
    wallet = new WalletClientGenerator(process.env.WALLET_SERVICE_URL);
    walletGRPC = wallet.create();

    client = new IntentRecognitionClientGenerator(
      `${process.env.IP_ADDRESS}:${process.env.HTTP_PORT}`,
    ).create();

    users = [wallet.getRandomUsername(), wallet.getRandomUsername()];
  });

  test("success: call cohere classify API, then create a wallet", async () => {
    const classifyRequest = new ClassifyRequest();

    const input = "crear wallet mxn";

    const classify = (): Promise<ClassifyReply.AsObject["action"]> =>
      new Promise((resolve) => {
        classifyRequest.setInput(input);

        client.classify(classifyRequest, (error, reply) => {
          if (error) {
            throw error;
          }

          resolve(reply.getAction());
        });
      });

    const action = await classify();

    expect(action).toBe("wallet_create");

    const createWalletRequest = new CreateWalletRequest();

    const createWallet = (
      userId: string,
    ): Promise<CreateWalletReply.AsObject["rapydEwalletAddress"]> =>
      new Promise((resolve) => {
        createWalletRequest.setUserId(userId);

        walletGRPC.createWallet(createWalletRequest, (error, reply) => {
          if (error) {
            throw error;
          }

          resolve(reply.getRapydEwalletAddress());
        });
      });

    const wallets = await Promise.all(users.map((user) => createWallet(user)));

    for (const [_, rapyd_ewallet_address] of wallets.entries()) {
      const { id } = await wallet.rapydHTTPClient().get<WalletObjectResponse>({
        path: `/v1/user/${rapyd_ewallet_address}`,
      });

      expect(id).toEqual(rapyd_ewallet_address);
    }
  });
});
