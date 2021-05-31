import { ModelCtor, Sequelize } from "sequelize";
import { WalletModel, WalletModelAttributes } from "../model/WalletModel";

export class WalletDAO {
  private driver: Sequelize;
  private model: ModelCtor<WalletModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(WalletModel.tableName);
  }

  async createWallet({ user_id }: WalletModelAttributes) {
    const result = await this.model.create({
      user_id,
    });

    return result.getDataValue("id");
  }
}
