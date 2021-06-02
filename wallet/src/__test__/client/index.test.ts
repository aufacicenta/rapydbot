import { Sequelize } from "sequelize";
import WalletClientGenerator, {
  CreateWalletRequest,
  TopUpWalletRequest,
  WalletClient,
} from "../../client";
import database from "../../database";
import { WalletDAO } from "../../database/dao/WalletDAO";
import RapydClient from "../../lib/rapyd/RapydClient";
import { WalletObjectResponse } from "../../lib/rapyd/types";
import getRandomUsername from "../util/getRandomUsername";

let driver: Sequelize,
  dao: WalletDAO,
  walletClient: WalletClient,
  rapydClient: RapydClient;

describe("controller", () => {
  const users = Array(1).fill(getRandomUsername());

  beforeAll(async () => {
    driver = await database.connect({ force: true });
    dao = new WalletDAO(driver);
    walletClient = new WalletClientGenerator(
      `${process.env.IP_ADDRESS}:${process.env.HTTP_PORT}`
    ).create();
    rapydClient = new RapydClient();
  });

  test("success: creates a real Rapyd wallet per user and stores it in the database and in Rapyd", async () => {
    const request = new CreateWalletRequest();

    const createWallet = (userId: string): Promise<string> =>
      new Promise((resolve) => {
        request.setUserId(userId);

        walletClient.createWallet(request, (error, reply) => {
          if (error) {
            throw error;
          }

          resolve(reply.getRapydEwalletAddress());
        });
      });

    const wallets = await Promise.all(users.map(createWallet));

    for (const [i, rapyd_ewallet_address] of wallets.entries()) {
      const userId = await dao.getUserIdByRapydEwalletAddress({
        rapyd_ewallet_address,
      });

      expect(users[i]).toEqual(userId);

      const { id, ewallet_reference_id } =
        await rapydClient.get<WalletObjectResponse>({
          path: `/v1/user/${rapyd_ewallet_address}`,
        });

      expect(id).toEqual(rapyd_ewallet_address);
      expect(ewallet_reference_id).toEqual(userId);
    }
  });

  test("success: creates a Rapyd checkout page to top up a Rapyd ewallet address", async () => {
    const request = new TopUpWalletRequest();

    const topUpWallet = (userId: string): Promise<string> =>
      new Promise((resolve) => {
        request.setUserId(userId);
        request.setCountry("MX");
        request.setCurrency("MXN");
        request.setAmount(123.25);

        walletClient.topUpWallet(request, (error, reply) => {
          if (error) {
            throw error;
          }

          resolve(reply.getCheckoutPageUrl());
        });
      });

    const checkout_page_urls = await Promise.all(users.map(topUpWallet));

    for (const url of checkout_page_urls) {
      expect(url).toBeTruthy();
    }
  });
});
