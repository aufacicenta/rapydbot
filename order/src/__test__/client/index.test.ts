import USER_ClientGenerator, {
  CreateUserRequest,
  UserClient,
} from "@aufax/user/client";
import { Sequelize } from "sequelize/types";
import { v4 as uuid } from "uuid";
import Transaction_ClientGenerator, { TransactionClient } from "../../client";
import database from "../../database";
import { OrderDAO } from "../../database/dao/OrderDAO";
import configuration from "../../server/config";
import {
  CreateOrderRequest,
  GetSellOrdersReply,
  GetSellOrdersRequest,
} from "../../server/protos/schema_pb";

let driver: Sequelize,
  dao: OrderDAO,
  transactionClient: TransactionClient,
  userClient: UserClient;

const { address, port } = configuration.get("server");

describe("client", () => {
  beforeAll(async () => {
    driver = await database.connect({ force: true });
    dao = new OrderDAO(driver);
    transactionClient = new Transaction_ClientGenerator(
      `${address}:${port}`
    ).create();
    userClient = new USER_ClientGenerator(`127.0.0.1:30041`).create();
  });

  test("success: getSellOrders", async () => {
    const createUser = (user): Promise<string> =>
      new Promise((resolve, reject) => {
        const createUserRequest = new CreateUserRequest();
        createUserRequest.setTelegramFromUserId(user.telegram_from_user_id);
        createUserRequest.setTelegramPrivateChatId(
          user.telegram_private_chat_id
        );
        createUserRequest.setTelegramUsername(user.telegram_username);

        userClient.findUserByTelegramUserIdOrCreateUser(
          createUserRequest,
          (err, response) => {
            if (err) {
              throw err;
            }

            resolve(response.getUserId());
          }
        );
      });

    const users = [
      {
        telegram_username: "username1",
        telegram_from_user_id: 1,
        telegram_private_chat_id: 1,
      },
      {
        telegram_username: "username2",
        telegram_from_user_id: 2,
        telegram_private_chat_id: 2,
      },
      {
        telegram_username: "username3",
        telegram_from_user_id: 3,
        telegram_private_chat_id: 3,
      },
      {
        telegram_username: "username4",
        telegram_from_user_id: 4,
        telegram_private_chat_id: 4,
      },
    ];

    const user_ids = await Promise.all(users.map((user) => createUser(user)));

    const createSellOrder = (order): Promise<void> =>
      new Promise((resolve, reject) => {
        const createTransactionRequest = new CreateOrderRequest();
        createTransactionRequest.setAmount(order.amount);
        createTransactionRequest.setFromCurrency(order.from_currency);
        createTransactionRequest.setToCurrency(order.to_currency);
        createTransactionRequest.setPriceId(uuid());

        const index = Math.floor(Math.random() * user_ids.length) + 1;
        createTransactionRequest.setUserId(user_ids[index]);

        transactionClient.createSellOrder(
          createTransactionRequest,
          (err, response) => {
            if (err) {
              throw err;
            }

            resolve();
          }
        );
      });

    const sell_orders = [
      { id: null, amount: 10, from_currency: "BTC", to_currency: "USD" },
      {
        id: null,
        amount: 11.5,
        from_currency: "BTC",
        to_currency: "USD",
      },
      { id: null, amount: 9, from_currency: "BTC", to_currency: "USD" },
    ];

    await Promise.all(sell_orders.map((order) => createSellOrder(order)));

    const amount = 10;
    const from_currency = "BTC";
    const to_currency = "USD";

    const getSellOrders = (): Promise<Array<GetSellOrdersReply.AsObject>> =>
      new Promise((resolve, reject) => {
        const request = new GetSellOrdersRequest();
        request.setAmount(amount);
        request.setFromCurrency(from_currency);
        request.setToCurrency(to_currency);

        const call = transactionClient.getSellOrders(request);

        const response: Array<GetSellOrdersReply.AsObject> = [];

        call.on("data", (data: GetSellOrdersReply) => {
          response.push(data.toObject());
        });

        call.on("end", () => {
          resolve(response);
        });
      });

    const response = await getSellOrders();

    expect(response.length).toBeGreaterThan(0);

    for (const order of response) {
      expect(order.amount).toBeDefined();
      expect(order.telegramUsername).toBeDefined();
      expect(order.fromCurrency).toBeDefined();
      expect(order.toCurrency).toBeDefined();
    }
  });
});
