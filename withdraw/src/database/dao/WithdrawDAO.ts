import { ModelCtor, Sequelize } from "sequelize";
import { WithdrawModel } from "../model/WithdrawModel";

export class WithdrawDAO {
  private driver: Sequelize;
  private model: ModelCtor<WithdrawModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(WithdrawModel.tableName);
  }

  async createWithdraw(args: {}) {
    const result = await this.model.create({});

    return result.getDataValue("id");
  }
}
