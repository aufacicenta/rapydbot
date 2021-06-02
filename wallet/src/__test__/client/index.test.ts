import { Sequelize } from "sequelize";
import WalletClientGenerator, {
  CreateWalletRequest,
  SetTransferFromWalletResponseReply,
  SetTransferFromWalletResponseRequest,
  TopUpWalletRequest,
  TransferFromWalletReply,
  TransferFromWalletRequest,
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
  const users = [getRandomUsername(), getRandomUsername()];

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

    const topUpWallet = ({
      userId,
      currency,
      country,
      amount,
    }: {
      userId: string;
      country: string;
      currency: string;
      amount: number;
    }): Promise<string> =>
      new Promise((resolve) => {
        request.setUserId(userId);
        request.setCountry(country);
        request.setCurrency(currency);
        request.setAmount(amount);

        walletClient.topUpWallet(request, (error, reply) => {
          if (error) {
            throw error;
          }

          resolve(reply.getCheckoutPageUrl());
        });
      });

    const url = await topUpWallet({
      userId: users[0],
      country: "MX",
      currency: "MXN",
      amount: 1000.0,
    });

    expect(url).toBeTruthy(); // PAUSE the debugger here to get the URL and top up wallet manually
  });

  test("success: transfers an amount from a Rapyd ewallet balance to another Rapyd ewallet", async () => {
    const requestCurrency = "MXN";
    const requestAmount = 500.0;

    const transferFromWallet = ({
      senderUserId,
      recipientUserId,
      currency,
      amount,
    }: TransferFromWalletRequest.AsObject): Promise<TransferFromWalletReply.AsObject> =>
      new Promise((resolve) => {
        const request = new TransferFromWalletRequest();

        request.setCurrency(currency);
        request.setAmount(amount);
        request.setSenderUserId(senderUserId);
        request.setRecipientUserId(recipientUserId);

        walletClient.transferFromWallet(request, (error, reply) => {
          if (error) {
            throw error;
          }

          resolve({
            pendingTransactionId: reply.getPendingTransactionId(),
            senderUserId: reply.getSenderUserId(),
            recipientUserId: reply.getRecipientUserId(),
          });
        });
      });

    const { pendingTransactionId, senderUserId, recipientUserId } =
      await transferFromWallet({
        senderUserId: users[0],
        recipientUserId: users[1],
        currency: requestCurrency,
        amount: requestAmount,
      });

    const setTransferFromWalletResponse = ({
      senderUserId,
      recipientUserId,
      responseStatus,
      pendingTransactionId,
    }: SetTransferFromWalletResponseRequest.AsObject): Promise<SetTransferFromWalletResponseReply.AsObject> =>
      new Promise((resolve) => {
        const request = new SetTransferFromWalletResponseRequest();

        request.setSenderUserId(senderUserId);
        request.setRecipientUserId(recipientUserId);
        request.setPendingTransactionId(pendingTransactionId);
        request.setResponseStatus(responseStatus);

        walletClient.setTransferFromWalletResponse(request, (error, reply) => {
          if (error) {
            throw error;
          }

          resolve({
            amount: reply.getAmount(),
            currency: reply.getCurrency(),
            senderUserId: reply.getSenderUserId(),
          });
        });
      });

    const setTransferFromWalletResponseReply =
      await setTransferFromWalletResponse({
        senderUserId,
        recipientUserId,
        responseStatus: "accept",
        pendingTransactionId,
      });

    expect(setTransferFromWalletResponseReply.amount).toEqual(requestAmount);
    expect(setTransferFromWalletResponseReply.currency).toEqual(
      requestCurrency
    );
    expect(setTransferFromWalletResponseReply.senderUserId).toEqual(users[0]);
  });
});
