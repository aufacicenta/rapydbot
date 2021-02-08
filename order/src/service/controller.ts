import USER_ClientGenerator, {
  GetUserReply,
  GetUsersRequest,
  UserClient,
} from "@aufax/user/client";
import fs from "fs";
import grpc from "grpc";
import { injectable } from "inversify";
import moment from "moment";
import "reflect-metadata";
import { OrderModel, OrderModelAttributes } from "../database/model/OrderModel";
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
    const credentials = {
      rootCerts: fs.readFileSync(`${process.env.SSL_CERTIFICATES_PATH}/ca.crt`),
      privateKey: fs.readFileSync(`${process.env.SSL_CERTIFICATES_PATH}/client.key`),
      certChain: fs.readFileSync(`${process.env.SSL_CERTIFICATES_PATH}/client.crt`),
    };

    this.UserServiceClient = new USER_ClientGenerator(process.env.USER_SERVICE_CLIENT_URL).create(
      credentials
    );
  }

  public static getExpiresAtSetting() {
    return moment().add(3, "hours").toISOString();
  }

  async createSellOrder(
    { call, callback }: gRPCServerUnaryCall<CreateOrderRequest, CreateOrderReply>,
    context: IContext
  ) {
    this.createOrder({ call, callback }, context, "sell");
  }

  async createBuyOrder(
    { call, callback }: gRPCServerUnaryCall<CreateOrderRequest, CreateOrderReply>,
    context: IContext
  ) {
    this.createOrder({ call, callback }, context, "buy");
  }

  async getSellOrders(
    { call }: gRPCServerWritableStream<GetSellOrdersRequest>,
    { dao }: IContext
  ) {
    const amount = call.request.getAmount();
    const from_currency = call.request.getFromCurrency().trim();
    const to_currency = call.request.getToCurrency().trim();

    const sell_orders = await dao.OrderDAO.getSellOrders(amount, from_currency, to_currency);

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
    sell_orders: OrderModel[]
  ): Promise<Array<GetUserReply.AsObject & OrderModelAttributes>> {
    const request = new GetUsersRequest();
    request.setUserIdList(sell_orders.map((o) => o.getDataValue("user_id")));

    return new Promise((resolve, reject) => {
      const call = this.UserServiceClient.getUsers(request);

      const response: Array<GetUserReply.AsObject & OrderModelAttributes> = [];

      call.on("data", (data: GetUserReply) => {
        const matching_order = sell_orders.filter(
          (o) => o.getDataValue("user_id") === data.getUserId()
        )[0];

        response.push({
          ...data.toObject(),
          ...(matching_order.toJSON() as OrderModelAttributes),
        });
      });

      call.on("end", () => {
        resolve(response);
      });
    });
  }

  private async createOrder(
    { call, callback }: gRPCServerUnaryCall<CreateOrderRequest, CreateOrderReply>,
    { dao }: IContext,
    type: OrderModelAttributes["type"]
  ) {
    const user_id = call.request.getUserId();
    const price_id = call.request.getPriceId();
    const amount = call.request.getAmount();
    const from_currency = call.request.getFromCurrency().trim();
    const to_currency = call.request.getToCurrency().trim();

    const expires_at = Controller.getExpiresAtSetting();

    const transaction_id = await dao.OrderDAO.createOrder({
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
}
