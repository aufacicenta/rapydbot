import moment from "moment";
import { ModelCtor, Op, Sequelize } from "sequelize";
import { OrderModel, OrderModelAttributes } from "../model/OrderModel";
export class OrderDAO {
  private driver: Sequelize;
  private model: ModelCtor<OrderModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(OrderModel.tableName);
  }

  public static getAmountLimitSetting(amount: number) {
    const ratio = 0.2;
    return {
      upper_limit: amount * (1 + ratio),
      lower_limit: amount * (1 - ratio),
    };
  }

  async createOrder({
    user_id,
    price_id,
    amount,
    from_currency,
    to_currency,
    expires_at,
    type,
  }: OrderModelAttributes) {
    const result = await this.model.create({
      user_id,
      price_id,
      amount,
      from_currency: from_currency.toUpperCase(),
      to_currency: Boolean(to_currency) ? to_currency.toUpperCase() : null,
      expires_at,
      type,
    });

    return result.getDataValue("id");
  }

  async getSellOrders(
    amount: number,
    from_currency: string,
    to_currency?: string
  ) {
    const now = moment().toISOString();

    const result = await this.model.findAll({
      where: {
        from_currency,
        to_currency: Boolean(to_currency) ? to_currency : null,
        expires_at: {
          [Op.gte]: now,
        },
        amount: {
          [Op.lte]: OrderDAO.getAmountLimitSetting(amount).upper_limit,
          [Op.gte]: OrderDAO.getAmountLimitSetting(amount).lower_limit,
        },
        type: "sell",
      },
      order: [["created_at", "DESC"]],
    });

    return result;
  }
}
