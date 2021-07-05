import grpc from "grpc";
import { injectable } from "inversify";
import "reflect-metadata";
import RapydClient from "../lib/rapyd/RapydClient";
import {
  CheckoutObjectResponse,
  CreateCheckoutPageParams,
  CreateWalletParams,
  GetDetailsOfWalletTransactionResponse,
  GetWalletBalanceResponse,
  SetTransferFromWalletParams,
  SetTransferFromWalletResponse,
  TransferFundsBetweenWalletsParams,
  TransferFundsBetweenWalletsResponse,
  WalletObjectResponse,
} from "../lib/rapyd/types";
import { IContext } from "../server/interface/IContext";
import {
  CreateWalletReply,
  CreateWalletRequest,
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
  GetUserIdFromWalletAddressReply,
  GetUserIdFromWalletAddressRequest,
} from "../server/protos/schema_pb";
import { WalletServiceErrorCodes } from "../service/error";

type gRPCServerUnaryCall<Request, Reply> = {
  call: grpc.ServerUnaryCall<Request>;
  callback: grpc.sendUnaryData<Reply>;
};

@injectable()
export class Controller {
  public static type: string = "Controller";

  private rapydClient = new RapydClient();

  async createWallet(
    {
      call,
      callback,
    }: gRPCServerUnaryCall<CreateWalletRequest, CreateWalletReply>,
    { dao }: IContext
  ) {
    try {
      const user_id = call.request.getUserId();

      const wallet_id = await dao.WalletDAO.getWalletIdByUserId({
        user_id,
      });

      if (Boolean(wallet_id)) {
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

      await dao.WalletDAO.createWallet({
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
    { dao }: IContext
  ) {
    try {
      const user_id = call.request.getUserId();
      const amount = call.request.getAmount();

      const rapyd_ewallet_address =
        await dao.WalletDAO.getRapydWalletAddressByUserId({
          user_id,
        });

      if (!Boolean(rapyd_ewallet_address)) {
        throw new Error(
          WalletServiceErrorCodes.rapyd_ewallet_does_not_exist_for_user_id
        );
      }

      const country_code = await dao.WalletDAO.getWalletCountryCode({
        user_id,
      });

      if (!Boolean(country_code)) {
        throw new Error(
          WalletServiceErrorCodes.rapyd_ewallet_does_not_have_an_established_country
        );
      }

      const currency_code = await dao.WalletDAO.getWalletCurrencyCode({
        user_id,
      });

      if (!Boolean(currency_code)) {
        throw new Error(
          WalletServiceErrorCodes.rapyd_ewallet_does_not_have_an_established_currency
        );
      }

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
    { dao }: IContext
  ) {
    try {
      const sender_user_id = call.request.getSenderUserId();
      const amount = call.request.getAmount();
      const recipient_user_id = call.request.getRecipientUserId();

      const sender_rapyd_ewallet_address =
        await dao.WalletDAO.getRapydWalletAddressByUserId({
          user_id: sender_user_id,
        });

      if (!Boolean(sender_rapyd_ewallet_address)) {
        throw new Error(
          WalletServiceErrorCodes.rapyd_ewallet_does_not_exist_for_sender_user_id
        );
      }

      const recipient_rapyd_ewallet_address =
        await dao.WalletDAO.getRapydWalletAddressByUserId({
          user_id: recipient_user_id,
        });

      if (!Boolean(recipient_rapyd_ewallet_address)) {
        throw new Error(
          WalletServiceErrorCodes.rapyd_ewallet_does_not_exist_for_recipient_user_id
        );
      }

      const currency_code = await dao.WalletDAO.getWalletCurrencyCode({
        user_id: sender_user_id,
      });

      // @TODO reply with an error if the recipient hasn't set a default currency_code yet

      const msg = call.request.getMsg();

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
          metadata: {
            senderUserId: sender_user_id,
            recipientUserId: recipient_user_id,
            msg,
          },
        },
      });

      const reply = new TransferFromWalletReply();

      reply.setPendingTransactionId(pending_transaction_id);
      reply.setSenderUserId(sender_user_id);
      reply.setRecipientUserId(recipient_user_id);
      reply.setCurrencyCode(currency_code);

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
    { dao }: IContext
  ) {
    try {
      const pending_transaction_id = call.request.getPendingTransactionId();
      const sender_user_id = call.request.getSenderUserId();
      const recipient_user_id = call.request.getRecipientUserId();
      const response_status = call.request.getResponseStatus();

      const recipient_rapyd_ewallet_address =
        await dao.WalletDAO.getRapydWalletAddressByUserId({
          user_id: recipient_user_id,
        });

      if (!Boolean(recipient_rapyd_ewallet_address)) {
        throw new Error(
          WalletServiceErrorCodes.rapyd_ewallet_does_not_exist_for_recipient_user_id
        );
      }

      const { destination_transaction_id } = await this.rapydClient.post<
        SetTransferFromWalletResponse,
        SetTransferFromWalletParams
      >({
        path: "/v1/account/transfer/response",
        body: {
          id: pending_transaction_id,
          status: response_status,
        },
      });

      const {
        amount: wallet_transaction_amount,
        currency: wallet_transaction_currency,
        status: wallet_transaction_status,
      } = await this.rapydClient.get<GetDetailsOfWalletTransactionResponse>({
        path: `/v1/user/${recipient_rapyd_ewallet_address}/transactions/${destination_transaction_id}`,
      });

      if (wallet_transaction_status !== "CLOSED") {
        throw new Error(
          WalletServiceErrorCodes.rapyd_transfer_to_ewallet_is_not_paid
        );
      }

      const reply = new SetTransferFromWalletResponseReply();

      reply.setAmount(wallet_transaction_amount);
      reply.setCurrencyCode(wallet_transaction_currency);
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
    { dao }: IContext
  ) {
    try {
      const user_id = call.request.getUserId();
      const rapyd_ewallet_address =
        await dao.WalletDAO.getRapydWalletAddressByUserId({ user_id });

      if (!Boolean(rapyd_ewallet_address)) {
        throw new Error(
          WalletServiceErrorCodes.rapyd_ewallet_does_not_exist_for_user_id
        );
      }

      const currency_code = await dao.WalletDAO.getWalletCurrencyCode({
        user_id,
      });

      if (!Boolean(currency_code)) {
        throw new Error(
          WalletServiceErrorCodes.rapyd_ewallet_does_not_have_an_established_currency
        );
      }

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

      let balanceBySelectedCurrency = balances
        .filter(({ currency }) => currency === currency_code)
        .shift();

      if (!Boolean(balanceBySelectedCurrency)) {
        /*
         * If there's no balance for the specified currency we will return
         * a general one.
         */

        balanceBySelectedCurrency = balances.shift();
      }

      const reply = new GetWalletBalanceReply();

      reply.setBalance(balanceBySelectedCurrency.balance);
      reply.setCurrencyCode(balanceBySelectedCurrency.currency);
      reply.setOnHoldBalance(balanceBySelectedCurrency.on_hold_balance);
      reply.setReceivedBalance(balanceBySelectedCurrency.received_balance);
      reply.setReserveBalance(balanceBySelectedCurrency.reserve_balance);

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
    { dao }: IContext
  ) {
    try {
      const user_id = call.request.getUserId();
      const rapyd_ewallet_currency_code = call.request.getCurrencyCode();

      const wallet_id = await dao.WalletDAO.getWalletIdByUserId({
        user_id,
      });

      if (!Boolean(wallet_id)) {
        throw new Error(
          WalletServiceErrorCodes.rapyd_ewallet_does_not_exist_for_user_id
        );
      }

      const currency_code = await dao.WalletDAO.setWalletCurrencyCode({
        id: wallet_id,
        rapyd_ewallet_currency_code,
      });

      if (!Boolean(currency_code)) {
        throw new Error(
          WalletServiceErrorCodes.ERROR_CANNOT_SET_USER_EWALLET_DEFAULT_CURRENCY
        );
      }

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
    { dao }: IContext
  ) {
    try {
      const user_id = call.request.getUserId();
      const rapyd_ewallet_address =
        await dao.WalletDAO.getRapydWalletAddressByUserId({ user_id });

      if (!Boolean(rapyd_ewallet_address)) {
        throw new Error(
          WalletServiceErrorCodes.ERROR_CANNOT_GET_USER_EWALLET_ESTABLISHED_CURRENCY
        );
      }

      const currency_code = await dao.WalletDAO.getWalletCurrencyCode({
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
    { dao }: IContext
  ) {
    try {
      const user_id = call.request.getUserId();
      const rapyd_ewallet_country_code = call.request.getCountryCode();

      const wallet_id = await dao.WalletDAO.getWalletIdByUserId({
        user_id,
      });

      if (!Boolean(wallet_id)) {
        throw new Error(
          WalletServiceErrorCodes.rapyd_ewallet_does_not_exist_for_user_id
        );
      }

      const country_code = await dao.WalletDAO.setWalletCountryCode({
        id: wallet_id,
        rapyd_ewallet_country_code,
      });

      if (!Boolean(country_code)) {
        throw new Error(
          WalletServiceErrorCodes.ERROR_CANNOT_SET_USER_EWALLET_DEFAULT_COUNTRY
        );
      }

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
    { dao }: IContext
  ) {
    try {
      const user_id = call.request.getUserId();
      const country_code = await dao.WalletDAO.getWalletCountryCode({
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
    { dao }: IContext
  ) {
    try {
      const rapyd_ewallet_address = call.request.getRapydEwalletAddress();
      const user_id = await dao.WalletDAO.getUserIdByRapydEwalletAddress({
        rapyd_ewallet_address,
      });

      if (!Boolean(user_id)) {
        throw new Error(
          WalletServiceErrorCodes.rapyd_ewallet_cannot_get_user_id
        );
      }

      const reply = new GetUserIdFromWalletAddressReply();

      reply.setUserId(user_id);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }
}
