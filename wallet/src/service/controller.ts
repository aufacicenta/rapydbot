import grpc from "grpc";
import { injectable } from "inversify";
import "reflect-metadata";
import RapydClient from "../lib/rapyd/RapydClient";
import {
  CheckoutObjectResponse,
  CreateCheckoutPageParams,
  CreateWalletParams,
  WalletObjectResponse,
} from "../lib/rapyd/types";
import { IContext } from "../server/interface/IContext";
import {
  CreateWalletReply,
  CreateWalletRequest,
  TopUpWalletReply,
  TopUpWalletRequest,
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
}
