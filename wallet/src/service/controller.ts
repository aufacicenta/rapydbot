import grpc from "grpc";
import { injectable } from "inversify";
import "reflect-metadata";
import { IContext } from "../server/interface/IContext";
import {
  CreateWalletRequest,
  CreateWalletResponse,
} from "../server/protos/schema_pb";

type GRPCUnaryCall<Request, Reply> = {
  call: grpc.ServerUnaryCall<Request>;
  callback: grpc.sendUnaryData<Reply>;
};

@injectable()
export class Controller {
  public static type: string = "Controller";

  async createWallet(
    {
      call,
      callback,
    }: GRPCUnaryCall<CreateWalletRequest, CreateWalletResponse>,
    { dao }: IContext
  ) {
    const wallet_type = call.request.getWalletType();
    const telegram_from_user_id = call.request.getTelegramFromUserId();
    const rapyd_e_wallet_reference = call.request.getRapydEWalletReference();

    // TODO Call Rapyd API and get wallet id
    const rapyd_e_wallet = "";

    const result = await dao.WalletDAO.createWallet({
      telegram_from_user_id,
      rapyd_e_wallet,
      rapyd_e_wallet_reference,
      wallet_type,
    });

    const reply = new CreateWalletResponse();

    reply.setUserId(result.userId);
    reply.setWalletId(result.walletId);

    callback(null, reply);
  }
}
