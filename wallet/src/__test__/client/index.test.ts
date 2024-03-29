/* eslint-disable jest/no-commented-out-tests */
import { Sequelize } from "sequelize";

import {
  WalletClientGenerator,
  CreateWalletRequest,
  SetTransferFromWalletResponseReply,
  SetTransferFromWalletResponseRequest,
  SetWalletCountryCodeRequest,
  SetWalletCurrencyCodeRequest,
  TopUpWalletRequest,
  TransferFromWalletReply,
  TransferFromWalletRequest,
  GetWalletBalanceReply,
  GetWalletBalanceRequest,
  WalletClient,
} from "../../client";
import database from "../../database";
import { Wallet } from "../../database/wallet";
import RapydClient from "../../providers/rapyd/client";
import { WalletObjectResponse } from "../../providers/rapyd/types";
import { WalletServiceErrorCodes } from "../../service/error";
import getRandomUsername from "../util/getRandomUsername";

let driver: Sequelize,
  dao: Wallet,
  walletClient: WalletClient,
  rapydClient: RapydClient;

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

const getBalance = ({
  userId,
  currencyCode,
}: GetWalletBalanceRequest.AsObject): Promise<GetWalletBalanceReply.AsObject> =>
  new Promise((resolve, _) => {
    const request = new GetWalletBalanceRequest();
    request.setUserId(userId);
    request.setCurrencyCode(currencyCode);

    walletClient.getWalletBalance(request, (error, reply) => {
      if (error) {
        throw error;
      }

      resolve({
        currencyCode: reply.getCurrencyCode(),
        balance: reply.getBalance(),
        onHoldBalance: reply.getOnHoldBalance(),
        receivedBalance: reply.getReceivedBalance(),
        reserveBalance: reply.getReserveBalance(),
      });
    });
  });

describe("controller", () => {
  const users = [getRandomUsername(), getRandomUsername()];
  const [sender, recipient] = users;
  const defaultCountryCode = "MX";
  const defaultCurrencyCode = "MXN";

  beforeAll(async () => {
    driver = await database.connect({ force: true });
    dao = new Wallet(driver);
    walletClient = new WalletClientGenerator(
      `${process.env.IP_ADDRESS}:${process.env.HTTP_PORT}`
    ).create();
    rapydClient = new RapydClient();
  });

  // test("success: get a list of all Rapyd official identification documents", async () => {
  //   const request = new GetOfficialIdDocumentsRequest();

  //   const getOfficialIdDocuments = (): Promise<void> =>
  //     new Promise((resolve) => {
  //       request.setCountryCode(defaultCountryCode);

  //       walletClient.getOfficialIdDocuments(request, (error, reply) => {
  //         if (error) {
  //           throw error;
  //         }

  //         resolve();
  //       });
  //     });

  //   await getOfficialIdDocuments();
  // });

  // test("success: get a list of all Rapyd supported countries", async () => {
  //   const request = new GetSupportedCountriesRequest();

  //   const getSupportedCountries = (): Promise<void> =>
  //     new Promise((resolve) => {
  //       walletClient.getSupportedCountries(request, (error, reply) => {
  //         if (error) {
  //           throw error;
  //         }

  //         resolve();
  //       });
  //     });

  //   await getSupportedCountries();
  // });

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

    const wallets = await Promise.all(users.map((user) => createWallet(user)));

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
    const sender_currency_code = defaultCurrencyCode;
    const sender_country_code = defaultCountryCode;

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
      amount: 1000,
    });

    expect(url).toBeTruthy(); // PAUSE the debugger here to get the URL and top up wallet manually
  });

  test("success: transfers an amount from a Rapyd ewallet balance to another Rapyd ewallet", async () => {
    const requestAmount = 500;

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

  test("success: gets wallet balance", async () => {
    const requestCurrency = defaultCurrencyCode;

    const {
      balance,
      currencyCode,
      onHoldBalance,
      reserveBalance,
      receivedBalance,
    } = await getBalance({
      userId: recipient,
      currencyCode: requestCurrency,
    });

    expect(balance).not.toBeUndefined();
    expect(currencyCode).toBe(requestCurrency);
    expect(onHoldBalance).toBeNull();
    expect(reserveBalance).toBeNull();
    expect(receivedBalance).toBeNull();
  });

  test("fail: wallet doesn't have balances", async () => {
    const requestCurrency = defaultCurrencyCode;

    await getBalance({
      userId: sender,
      currencyCode: requestCurrency,
    }).catch((error) => {
      expect(error).toMatch(
        WalletServiceErrorCodes.rapyd_ewallet_does_not_have_balances
      );
    });
  });
});
