import axios from "axios";
import * as grpc from "@grpc/grpc-js";

import RapydClient from "../providers/rapyd/client";
import {
  CheckoutObjectResponse,
  CreateCheckoutPageParams,
  CreateWalletParams,
  GetWalletBalanceResponse,
  SetTransferFromWalletParams,
  SetTransferFromWalletResponse,
  TransferFundsBetweenWalletsParams,
  TransferFundsBetweenWalletsResponse,
  WalletObjectResponse,
} from "../providers/rapyd/types";
import { IContext } from "../server/interface/IContext";
import {
  CreateWalletReply,
  CreateWalletRequest,
  EmptyReply,
  GetOfficialIdDocumentsRequest,
  GetSupportedCountriesRequest,
  GetUserIdFromWalletAddressReply,
  GetUserIdFromWalletAddressRequest,
  GetWalletBalanceReply,
  GetWalletBalanceRequest,
  GetWalletCountryCodeReply,
  GetWalletCountryCodeRequest,
  GetWalletCurrencyCodeReply,
  GetWalletCurrencyCodeRequest,
  SetTransferFromWalletResponseReply,
  SetTransferFromWalletResponseRequest,
  SetWalletCountryCodeReply,
  SetWalletCountryCodeRequest,
  SetWalletCurrencyCodeReply,
  SetWalletCurrencyCodeRequest,
  TopUpWalletReply,
  TopUpWalletRequest,
  TransferFromWalletReply,
  TransferFromWalletRequest,
} from "../server/protos/schema_pb";
import { WalletServiceErrorCodes } from "../service/error";

type gRPCServerUnaryCall<Request, Reply> = {
  call: grpc.ServerUnaryCall<Request, Reply>;
  callback: grpc.sendUnaryData<Reply>;
};

export class Controller {
  public static type: string = "Controller";

  private rapydClient = new RapydClient();

  async getOfficialIdDocuments(
    {
      call,
      callback,
    }: gRPCServerUnaryCall<GetOfficialIdDocumentsRequest, EmptyReply>,
    {}: IContext
  ) {
    try {
      const country_code = call.request.getCountryCode();

      await this.rapydClient.get<any>({
        path: `/v1/identities/types?country=${country_code}`,
      });

      const reply = new EmptyReply();

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async getSupportedCountries(
    { callback }: gRPCServerUnaryCall<GetSupportedCountriesRequest, EmptyReply>,
    {}: IContext
  ) {
    try {
      await this.rapydClient.get<any>({
        path: "/v1/data/countries",
      });

      const reply = new EmptyReply();

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async createWallet(
    {
      call,
      callback,
    }: gRPCServerUnaryCall<CreateWalletRequest, CreateWalletReply>,
    { db }: IContext
  ) {
    try {
      const user_id = call.request.getUserId();

      const wallet_id = await db.wallet.getWalletIdByUserId({
        user_id,
      });

      if (wallet_id) {
        throw new Error(
          WalletServiceErrorCodes.rapyd_ewallet_exists_for_user_id
        );
      }

      const { id: rapyd_ewallet_address } = await this.rapydClient.post<
        WalletObjectResponse,
        CreateWalletParams
      >({
        path: "/v1/user",
        body: {
          ewallet_reference_id: user_id,
        },
      });

      await db.wallet.create({
        user_id,
        rapyd_ewallet_address,
      });

      const reply = new CreateWalletReply();

      reply.setRapydEwalletAddress(rapyd_ewallet_address);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async topUpWallet(
    {
      call,
      callback,
    }: gRPCServerUnaryCall<TopUpWalletRequest, TopUpWalletReply>,
    { db }: IContext
  ) {
    try {
      const user_id = call.request.getUserId();
      const amount = call.request.getAmount();

      const rapyd_ewallet_address =
        await db.wallet.getRapydWalletAddressByUserId({
          user_id,
        });

      const country_code = await db.wallet.getCountryCode({
        user_id,
      });

      const currency_code = await db.wallet.getCurrencyCode({
        user_id,
      });

      const msg = call.request.getMsg();

      const { redirect_url: checkout_page_url } = await this.rapydClient.post<
        CheckoutObjectResponse,
        CreateCheckoutPageParams
      >({
        path: "/v1/checkout",
        body: {
          country: country_code,
          currency: currency_code,
          amount,
          ewallet: rapyd_ewallet_address,
          metadata: {
            userId: user_id,
            msg,
          },
        },
      });

      const reply = new TopUpWalletReply();

      reply.setCheckoutPageUrl(checkout_page_url);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async transferFromWallet(
    {
      call,
      callback,
    }: gRPCServerUnaryCall<TransferFromWalletRequest, TransferFromWalletReply>,
    { db }: IContext
  ) {
    try {
      const sender_user_id = call.request.getSenderUserId();
      const amount = call.request.getAmount();
      const recipient_user_id = call.request.getRecipientUserId();

      const sender_rapyd_ewallet_address =
        await db.wallet.getRapydWalletAddressByUserId({
          user_id: sender_user_id,
        });

      const recipient_rapyd_ewallet_address =
        await db.wallet.getRapydWalletAddressByUserId({
          user_id: recipient_user_id,
        });

      const currency_code = await db.wallet.getCurrencyCode({
        user_id: sender_user_id,
      });

      const msg = call.request.getMsg();

      const metadata = {
        senderUserId: sender_user_id,
        recipientUserId: recipient_user_id,
        msg,
      };

      const { id: pending_transaction_id } = await this.rapydClient.post<
        TransferFundsBetweenWalletsResponse,
        TransferFundsBetweenWalletsParams
      >({
        path: "/v1/account/transfer",
        body: {
          currency: currency_code,
          amount,
          source_ewallet: sender_rapyd_ewallet_address,
          destination_ewallet: recipient_rapyd_ewallet_address,
          metadata,
        },
      });

      const reply = new TransferFromWalletReply();

      reply.setPendingTransactionId(pending_transaction_id);
      reply.setSenderUserId(sender_user_id);
      reply.setRecipientUserId(recipient_user_id);
      reply.setCurrencyCode(currency_code);

      // Notify the Bot via an internal webhook
      const body = {
        type: "TRANSFER_FUNDS_BETWEEN_WALLETS_INTERNAL_NOTIFICATION",
        data: {
          ...metadata,
          amount,
          currency_code,
          pending_transaction_id,
        },
      };

      axios
        .post(process.env.RAPYDBOT_WEBHOOKS_ENDPOINT!, body, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          console.log(body.type);
        })
        .catch((error) => {
          console.error(error);
        });

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async setTransferFromWalletResponse(
    {
      call,
      callback,
    }: gRPCServerUnaryCall<
      SetTransferFromWalletResponseRequest,
      SetTransferFromWalletResponseReply
    >,
    { db }: IContext
  ) {
    try {
      const pending_transaction_id = call.request.getPendingTransactionId();
      const sender_user_id = call.request.getSenderUserId();
      const recipient_user_id = call.request.getRecipientUserId();
      const response_status = call.request.getResponseStatus();

      const recipient_rapyd_ewallet_address =
        await db.wallet.getRapydWalletAddressByUserId({
          user_id: recipient_user_id,
        });

      if (!Boolean(recipient_rapyd_ewallet_address)) {
        throw new Error(
          WalletServiceErrorCodes.rapyd_ewallet_does_not_exist_for_recipient_user_id
        );
      }

      const { status, amount, currency_code } = await this.rapydClient.post<
        SetTransferFromWalletResponse,
        SetTransferFromWalletParams
      >({
        path: "/v1/account/transfer/response",
        body: {
          id: pending_transaction_id,
          status: response_status,
        },
      });

      if (status !== "CLO") {
        throw new Error(
          WalletServiceErrorCodes.rapyd_transfer_to_ewallet_is_not_paid
        );
      }

      const reply = new SetTransferFromWalletResponseReply();

      reply.setAmount(amount);
      reply.setCurrencyCode(currency_code);
      reply.setSenderUserId(sender_user_id);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async getWalletBalance(
    {
      call,
      callback,
    }: gRPCServerUnaryCall<GetWalletBalanceRequest, GetWalletBalanceReply>,
    { db }: IContext
  ) {
    try {
      const user_id = call.request.getUserId();
      const rapyd_ewallet_address =
        await db.wallet.getRapydWalletAddressByUserId({ user_id });

      const currency_code = await db.wallet.getCurrencyCode({
        user_id,
      });

      const balances = await this.rapydClient.get<
        Array<GetWalletBalanceResponse>
      >({
        path: `/v1/user/${rapyd_ewallet_address}/accounts`,
      });

      if (!Boolean(balances.length)) {
        throw new Error(
          WalletServiceErrorCodes.rapyd_ewallet_does_not_have_balances
        );
      }

      /*
       * If there's no balance for the specified currency we will return
       * a general one.
       */
      let balanceBySelectedCurrency =
        balances.filter(({ currency }) => currency === currency_code).shift() ||
        balances.shift();

      const reply = new GetWalletBalanceReply();

      reply.setBalance(balanceBySelectedCurrency!.balance);
      reply.setCurrencyCode(balanceBySelectedCurrency!.currency);
      reply.setOnHoldBalance(balanceBySelectedCurrency!.on_hold_balance);
      reply.setReceivedBalance(balanceBySelectedCurrency!.received_balance);
      reply.setReserveBalance(balanceBySelectedCurrency!.reserve_balance);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async setWalletCurrencyCode(
    {
      call,
      callback,
    }: gRPCServerUnaryCall<
      SetWalletCurrencyCodeRequest,
      SetWalletCurrencyCodeReply
    >,
    { db }: IContext
  ) {
    try {
      const user_id = call.request.getUserId();
      const rapyd_ewallet_currency_code = call.request.getCurrencyCode();

      const wallet_id = await db.wallet.getWalletIdByUserId({
        user_id,
      });

      const currency_code = await db.wallet.setCurrencyCode({
        id: wallet_id,
        rapyd_ewallet_currency_code,
      });

      const reply = new SetWalletCurrencyCodeReply();

      reply.setCurrencyCode(currency_code);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async getWalletCurrencyCode(
    {
      call,
      callback,
    }: gRPCServerUnaryCall<
      GetWalletCurrencyCodeRequest,
      GetWalletCurrencyCodeReply
    >,
    { db }: IContext
  ) {
    try {
      const user_id = call.request.getUserId();
      const rapyd_ewallet_address =
        await db.wallet.getRapydWalletAddressByUserId({ user_id });

      if (!Boolean(rapyd_ewallet_address)) {
        throw new Error(
          WalletServiceErrorCodes.ERROR_CANNOT_GET_USER_EWALLET_ESTABLISHED_CURRENCY
        );
      }

      const currency_code = await db.wallet.getCurrencyCode({
        user_id,
      });

      const reply = new GetWalletCurrencyCodeReply();

      reply.setCurrencyCode(currency_code);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async setWalletCountryCode(
    {
      call,
      callback,
    }: gRPCServerUnaryCall<
      SetWalletCountryCodeRequest,
      SetWalletCountryCodeReply
    >,
    { db }: IContext
  ) {
    try {
      const user_id = call.request.getUserId();
      const rapyd_ewallet_country_code = call.request.getCountryCode();

      const wallet_id = await db.wallet.getWalletIdByUserId({
        user_id,
      });

      const country_code = await db.wallet.setCountryCode({
        id: wallet_id,
        rapyd_ewallet_country_code,
      });

      const reply = new SetWalletCountryCodeReply();

      reply.setCountryCode(country_code);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async getWalletCountryCode(
    {
      call,
      callback,
    }: gRPCServerUnaryCall<
      GetWalletCountryCodeRequest,
      GetWalletCountryCodeReply
    >,
    { db }: IContext
  ) {
    try {
      const user_id = call.request.getUserId();
      const country_code = await db.wallet.getCountryCode({
        user_id,
      });

      if (!Boolean(country_code)) {
        throw new Error(
          WalletServiceErrorCodes.ERROR_CANNOT_GET_USER_EWALLET_ESTABLISHED_COUNTRY
        );
      }

      const reply = new GetWalletCountryCodeReply();

      reply.setCountryCode(country_code);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async getUserIdFromWalletAddress(
    {
      call,
      callback,
    }: gRPCServerUnaryCall<
      GetUserIdFromWalletAddressRequest,
      GetUserIdFromWalletAddressReply
    >,
    { db }: IContext
  ) {
    try {
      const rapyd_ewallet_address = call.request.getRapydEwalletAddress();

      const user_id = await db.wallet.getUserIdByRapydEwalletAddress({
        rapyd_ewallet_address,
      });

      const reply = new GetUserIdFromWalletAddressReply();

      reply.setUserId(user_id);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }
}
