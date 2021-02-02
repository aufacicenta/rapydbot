import moment from "moment";
import { ModelCtor, Op, Sequelize } from "sequelize";
import { TransactionModel } from "../model/TransactionModel";
export class TransactionDAO {
  private driver: Sequelize;
  private model: ModelCtor<TransactionModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(TransactionModel.tableName);
  }

  public static getAmountLimitSetting(amount: number) {
    const ratio = 0.2;
    return {
      upper_limit: amount * (1 + ratio),
      lower_limit: amount * (1 - ratio),
    };
  }

  async createTransaction(
    user_id: string,
    price_id: string,
    amount: number,
    from_currency: string,
    to_currency: string,
    expires_at: string
  ) {
    const result = await this.model.create({
      user_id,
      price_id,
      amount,
      from_currency: from_currency.toUpperCase(),
      to_currency: Boolean(to_currency) ? to_currency.toUpperCase() : null,
      expires_at,
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
          [Op.lte]: TransactionDAO.getAmountLimitSetting(amount).upper_limit,
          [Op.gte]: TransactionDAO.getAmountLimitSetting(amount).lower_limit,
        },
      },
      order: [["created_at", "DESC"]],
    });

    return result;
  }
}
