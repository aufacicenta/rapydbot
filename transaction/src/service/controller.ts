import grpc from "grpc";
import { injectable } from "inversify";
import moment from "moment";
import "reflect-metadata";
import { IContext } from "../server/interface/IContext";
import {
  CreateTransactionReply,
  CreateTransactionRequest,
} from "../server/protos/schema_pb";

type GRPC<Request, Reply> = {
  call: grpc.ServerUnaryCall<Request>;
  callback: grpc.sendUnaryData<Reply>;
};

@injectable()
export class Controller {
  public static type: string = "Controller";

  public static getExpiresAtSetting() {
    return moment().add(3, "hours").toISOString();
  }

  async createTransaction(
    { call, callback }: GRPC<CreateTransactionRequest, CreateTransactionReply>,
    { dao }: IContext
  ) {
    const user_id = call.request.getUserId();
    const price_id = call.request.getPriceId();
    const amount = call.request.getAmount();
    const from_currency = call.request.getFromCurrency().trim();
    const to_currency = call.request.getToCurrency().trim();

    const expires_at = moment().add(3, "hours").toISOString();

    const transaction_id = await dao.TransactionDAO.createTransaction(
      user_id,
      price_id,
      amount,
      from_currency,
      to_currency,
      expires_at
    );

    const reply = new CreateTransactionReply();

    reply.setTransactionId(transaction_id);
    reply.setExpiresAt(expires_at);

    callback(null, reply);
  }
}
