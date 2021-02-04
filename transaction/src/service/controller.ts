import USER_ClientGenerator, {
  GetUserReply,
  GetUsersRequest,
  UserClient,
} from "@aufax/user/client";
import grpc from "grpc";
import { injectable } from "inversify";
import moment from "moment";
import "reflect-metadata";
import {
  TransactionModel,
  TransactionModelAttributes,
} from "../database/model/TransactionModel";
import { IContext } from "../server/interface/IContext";
import {
  CreateOrderReply,
  CreateOrderRequest,
  GetSellOrdersReply,
  GetSellOrdersRequest,
} from "../server/protos/schema_pb";

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

  private UserServiceClient: UserClient;

  constructor() {
    this.UserServiceClient = new USER_ClientGenerator(
      "127.0.0.1:30041"
    ).create();
  }

  public static getExpiresAtSetting() {
    return moment().add(3, "hours").toISOString();
  }

  async createSellOrder(
    {
      call,
      callback,
    }: gRPCServerUnaryCall<CreateOrderRequest, CreateOrderReply>,
    context: IContext
  ) {
    await this.createOrder({ call, callback }, context, "sell");
  }

  async createBuyOrder(
    {
      call,
      callback,
    }: gRPCServerUnaryCall<CreateOrderRequest, CreateOrderReply>,
    context: IContext
  ) {
    await this.createOrder({ call, callback }, context, "buy");
  }

  async createOrder(
    {
      call,
      callback,
    }: gRPCServerUnaryCall<CreateOrderRequest, CreateOrderReply>,
    { dao }: IContext,
    type: TransactionModelAttributes["type"]
  ) {
    const user_id = call.request.getUserId();
    const price_id = call.request.getPriceId();
    const amount = call.request.getAmount();
    const from_currency = call.request.getFromCurrency().trim();
    const to_currency = call.request.getToCurrency().trim();

    const expires_at = Controller.getExpiresAtSetting();

    const transaction_id = await dao.TransactionDAO.createOrder({
      user_id,
      price_id,
      amount,
      from_currency,
      to_currency,
      expires_at,
      type,
    });

    const reply = new CreateOrderReply();

    reply.setTransactionId(transaction_id);
    reply.setExpiresAt(expires_at);

    callback(null, reply);
  }

  async getSellOrders(
    { call }: gRPCServerWritableStream<GetSellOrdersRequest>,
    { dao }: IContext
  ) {
    const amount = call.request.getAmount();
    const from_currency = call.request.getFromCurrency().trim();
    const to_currency = call.request.getToCurrency().trim();

    const sell_orders = await dao.TransactionDAO.getSellOrders(
      amount,
      from_currency,
      to_currency
    );

    const response = await this.getUsersMergedWithOrders(sell_orders);

    for (const order of response) {
      const reply = new GetSellOrdersReply();

      reply.setAmount(order.amount);
      reply.setFromCurrency(order.from_currency);
      reply.setToCurrency(order.to_currency);
      reply.setTelegramUsername(order.telegramUsername);

      call.write(reply, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    call.end();
  }

  private async getUsersMergedWithOrders(
    sell_orders: TransactionModel[]
  ): Promise<Array<GetUserReply.AsObject & TransactionModelAttributes>> {
    const request = new GetUsersRequest();
    request.setUserIdList(sell_orders.map((o) => o.getDataValue("user_id")));

    return new Promise((resolve, reject) => {
      const call = this.UserServiceClient.getUsers(request);

      const response: Array<
        GetUserReply.AsObject & TransactionModelAttributes
      > = [];

      call.on("data", (data: GetUserReply) => {
        const matching_order = sell_orders.filter(
          (o) => o.getDataValue("user_id") === data.getUserId()
        )[0];

        response.push({
          ...data.toObject(),
          ...(matching_order.toJSON() as TransactionModelAttributes),
        });
      });

      call.on("end", () => {
        resolve(response);
      });
    });
  }
}
