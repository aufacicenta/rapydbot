import grpc from "grpc";
import { injectable } from "inversify";
import "reflect-metadata";
import RapydClient from "../lib/rapyd/RapydClient";
import {
  CheckoutObjectResponse,
  CreateCheckoutPageParams,
  CreateWalletParams,
  GetDetailsOfWalletTransactionResponse,
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
  SetTransferFromWalletResponseReply,
  SetTransferFromWalletResponseRequest,
  TopUpWalletReply,
  TopUpWalletRequest,
  TransferFromWalletReply,
  TransferFromWalletRequest,
} from "../server/protos/schema_pb";
import { WalletServiceErrorCodes } from "../service/error";

type gRPCServerUnaryCall<Request, Reply> = {
  call: grpc.ServerUnaryCall<Request>;
  callback: grpc.sendUnaryData<Reply>;
};

type gRPCServerWritableStream<Request> = {
  call: grpc.ServerWritableStream<Request>;
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
      const country = call.request.getCountry();
      const currency = call.request.getCurrency();
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

      const { redirect_url: checkout_page_url } = await this.rapydClient.post<
        CheckoutObjectResponse,
        CreateCheckoutPageParams
      >({
        path: "/v1/checkout",
        body: {
          country,
          currency,
          amount,
          ewallet: rapyd_ewallet_address,
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
      const currency = call.request.getCurrency();
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

      const { id: pending_transaction_id, status } =
        await this.rapydClient.post<
          TransferFundsBetweenWalletsResponse,
          TransferFundsBetweenWalletsParams
        >({
          path: "/v1/account/transfer",
          body: {
            currency,
            amount,
            source_ewallet: sender_rapyd_ewallet_address,
            destination_ewallet: recipient_rapyd_ewallet_address,
          },
        });

      const reply = new TransferFromWalletReply();

      reply.setPendingTransactionId(pending_transaction_id);
      reply.setSenderUserId(sender_user_id);
      reply.setRecipientUserId(recipient_user_id);

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
      reply.setCurrency(wallet_transaction_currency);
      reply.setSenderUserId(sender_user_id);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }
}
