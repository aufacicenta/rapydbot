import { ModelCtor, Sequelize } from "sequelize";
import { TransactionModel } from "../model/TransactionModel";

export class TransactionDAO {
  private driver: Sequelize;
  private model: ModelCtor<TransactionModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(TransactionModel.tableName);
  }

  async createTransaction(
    user_id: string,
    amount: number,
    from_currency: string,
    to_currency: string,
    expires_at: string
  ) {
    const result = await this.model.create({
      user_id,
      amount,
      from_currency,
      to_currency,
      expires_at,
    });

    return result.getDataValue("id");
  }
}
