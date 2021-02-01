import grpc from "grpc";
import { injectable } from "inversify";
import moment from "moment";
import "reflect-metadata";
import { IContext } from "../server/interface/IContext";
import {
  CreateTransactionReply,
  CreateTransactionRequest,
  GetTransactionBreakdownReply,
  GetTransactionBreakdownRequest,
} from "../server/protos/schema_pb";

type GRPC<Request, Reply> = {
  call: grpc.ServerUnaryCall<Request>;
  callback: grpc.sendUnaryData<Reply>;
};

@injectable()
export class Controller {
  public static type: string = "Controller";

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

  async getTransactionBreakdown(
    {
      call,
      callback,
    }: GRPC<GetTransactionBreakdownRequest, GetTransactionBreakdownReply>,
    { dao }: IContext
  ) {
    const user_id = call.request.getUserId();
    const from_currency = `GTQ`; // TODO get this from user config
    const to_currency = call.request.getToCurrency();
    const amount = call.request.getAmount();

    // TODO, store every single request in database to keep track of tx amounts, desired currencies

    const reply = new GetTransactionBreakdownReply();

    /**
     * Functionality description
     * Aufa X bot is a P2P marketplace of currencies (money). A user wants to sell BTC and a user is looking to buy BTC
     * In the case of a BUY request, the algorithm should search for sellers that are selling the desired amount (or between the range of the amount)
     * In the case of a SELL request, the algorithm should wait for BUY requests.
     *
     * Questions:
     * Should the SELL orders expire?
     * After a successful transaction, the users may leave a review to each other
     * Should the sellers choose a pricing provider? Can they set their own price? Can they program their own pricing provider through an API?
     * To keep users engaged, sellers must publish their amounts every < 24 hours
     * The bot can also ask the sellers whether they still are selling after N hours
     */

    const currency_pair = `USD/${to_currency}`;
    const price = `USD 35,000.00`; // TODO get from price service
    const exchange_rate = `7.5 ${from_currency}/USD`; // TODO get from exchange rate service
    const exchange_rate_result = `${from_currency} 1,020.00`; // TODO multiply exchange rate * amount
    const fee = `5%`; // TODO get from fees service || calculate in transaction service (using user_id)
    const fee_result = `${from_currency} 1,000.00`; // TODO multiply previous result amount * fee
    const total_result = `${from_currency} 989.00`; // TODO add subtotal result amounts

    // reply.setId(result.getDataValue("id"));

    callback(null, reply);
  }
}
