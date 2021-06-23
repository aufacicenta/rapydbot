import { Sequelize } from "sequelize";
import WalletClientGenerator, {
  CreateWalletRequest,
  SetTransferFromWalletResponseReply,
  SetTransferFromWalletResponseRequest,
  SetWalletCountryCodeRequest,
  SetWalletCurrencyCodeRequest,
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
  const [sender, recipient] = users;

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

  test("success: sets a default country and currency code", async () => {
    const setDefaultCurrencyCode = ({
      userId,
      currencyCode,
    }: SetWalletCurrencyCodeRequest.AsObject): Promise<string> =>
      new Promise((resolve) => {
        const request = new SetWalletCurrencyCodeRequest();
        request.setUserId(userId);
        request.setCurrencyCode(currencyCode);

        walletClient.setWalletCurrencyCode(request, (error, reply) => {
          if (error) {
            throw error;
          }

          resolve(reply.getCurrencyCode());
        });
      });

    const setDefaultCountryCode = ({
      userId,
      countryCode,
    }: SetWalletCountryCodeRequest.AsObject): Promise<string> =>
      new Promise((resolve) => {
        const request = new SetWalletCountryCodeRequest();
        request.setUserId(userId);
        request.setCountryCode(countryCode);

        walletClient.setWalletCountryCode(request, (error, reply) => {
          if (error) {
            throw error;
          }

          resolve(reply.getCountryCode());
        });
      });

    const sender_currency_code = "MXN";
    const sender_country_code = "MX";

    const sender_currency_code_response = await setDefaultCurrencyCode({
      userId: sender,
      currencyCode: sender_currency_code,
    });

    const sender_country_code_response = await setDefaultCountryCode({
      userId: sender,
      countryCode: sender_country_code,
    });

    expect(sender_currency_code_response).toEqual(sender_currency_code);
    expect(sender_country_code_response).toEqual(sender_country_code);

    const recipient_currency_code = "USD";
    const recipient_country_code = "US";

    const recipient_currency_code_response = await setDefaultCurrencyCode({
      userId: recipient,
      currencyCode: recipient_currency_code,
    });

    const recipient_country_code_response = await setDefaultCountryCode({
      userId: recipient,
      countryCode: recipient_country_code,
    });

    expect(recipient_currency_code_response).toEqual(recipient_currency_code);
    expect(recipient_country_code_response).toEqual(recipient_country_code);
  });

  test("success: creates a Rapyd checkout page to top up a Rapyd ewallet address", async () => {
    const request = new TopUpWalletRequest();

    const topUpWallet = ({
      userId,
      amount,
    }: {
      userId: string;
      amount: number;
    }): Promise<string> =>
      new Promise((resolve) => {
        request.setUserId(userId);
        request.setAmount(amount);
        request.setMsg("{}");

        walletClient.topUpWallet(request, (error, reply) => {
          if (error) {
            throw error;
          }

          resolve(reply.getCheckoutPageUrl());
        });
      });

    const url = await topUpWallet({
      userId: sender,
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
      amount,
      msg,
    }: TransferFromWalletRequest.AsObject): Promise<TransferFromWalletReply.AsObject> =>
      new Promise((resolve) => {
        const request = new TransferFromWalletRequest();

        request.setAmount(amount);
        request.setSenderUserId(senderUserId);
        request.setRecipientUserId(recipientUserId);
        request.setMsg(msg);

        walletClient.transferFromWallet(request, (error, reply) => {
          if (error) {
            throw error;
          }

          resolve({
            pendingTransactionId: reply.getPendingTransactionId(),
            senderUserId: reply.getSenderUserId(),
            recipientUserId: reply.getRecipientUserId(),
            currencyCode: reply.getCurrencyCode(),
          });
        });
      });

    const {
      pendingTransactionId,
      senderUserId,
      recipientUserId,
      currencyCode,
    } = await transferFromWallet({
      senderUserId: sender,
      recipientUserId: recipient,
      amount: requestAmount,
      msg: "{}",
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
            currencyCode: reply.getCurrencyCode(),
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
    expect(setTransferFromWalletResponseReply.currencyCode).toEqual(
      currencyCode
    );
    expect(setTransferFromWalletResponseReply.senderUserId).toEqual(sender);
  });
});
