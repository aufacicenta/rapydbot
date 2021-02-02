import { Sequelize } from "sequelize/types";
import { v4 as uuid } from "uuid";
import database from "../../../database";
import { TransactionDAO } from "../../../database/dao/TransactionDAO";
import { Controller } from "../../../service/controller";

let driver: Sequelize, dao: TransactionDAO;

describe("database:dao:transaction", () => {
  beforeEach(async () => {
    driver = await database.connect({ force: true });
    dao = new TransactionDAO(driver);
  });

  test("success: get sell orders matching criteria", async () => {
    const sell_orders = [
      { id: null, amount: 10, from_currency: "BTC", to_currency: "USD" },
      { id: null, amount: 11.5, from_currency: "BTC", to_currency: "USD" },
      { id: null, amount: 9, from_currency: "BTC", to_currency: "USD" },
    ];

    let i = 0;
    for (const order of sell_orders) {
      const user_id = uuid();
      const price_id = uuid();
      const expires_at = Controller.getExpiresAtSetting();

      const transaction_id = await dao.createTransaction(
        user_id,
        price_id,
        order.amount,
        order.from_currency,
        order.to_currency,
        expires_at
      );

      sell_orders[i].id = transaction_id;
      i++;
    }

    const result = await dao.getSellOrders(9.7, "BTC", "USD");
    expect(result.length).toEqual(3);
  });

  test("success: get sell orders matching criteria", async () => {
    const sell_orders = [
      { id: null, amount: 10, from_currency: "BTC" },
      { id: null, amount: 11.5, from_currency: "BTC", to_currency: "GTQ" },
      { id: null, amount: 9, from_currency: "BTC", to_currency: "GTQ" },
    ];

    let i = 0;
    for (const order of sell_orders) {
      const user_id = uuid();
      const price_id = uuid();
      const expires_at = Controller.getExpiresAtSetting();

      const transaction_id = await dao.createTransaction(
        user_id,
        price_id,
        order.amount,
        order.from_currency,
        order.to_currency,
        expires_at
      );

      sell_orders[i].id = transaction_id;
      i++;
    }

    const result = await dao.getSellOrders(9.7, "BTC", "GTQ");
    expect(result.length).toEqual(2);
  });
});
