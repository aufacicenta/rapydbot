import { ModelCtor, Sequelize } from "sequelize";
import { WalletModel, WalletModelAttributes } from "../model/WalletModel";

export class WalletDAO {
  private driver: Sequelize;
  private model: ModelCtor<WalletModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(WalletModel.tableName);
  }

  async createWallet({
    user_id,
    rapyd_ewallet_address,
  }: WalletModelAttributes) {
    const result = await this.model.create({
      user_id,
      rapyd_ewallet_address,
    });

    return !Boolean(result) ? null : result.getDataValue("id");
  }

  async getWalletIdByUserId({
    user_id,
  }: Pick<WalletModelAttributes, "user_id">) {
    const result = await this.model.findOne({
      where: {
        user_id,
      },
    });

    return !Boolean(result) ? null : result.getDataValue("id");
  }

  async getUserIdByRapydEwalletAddress({
    rapyd_ewallet_address,
  }: Pick<WalletModelAttributes, "rapyd_ewallet_address">) {
    const result = await this.model.findOne({
      where: {
        rapyd_ewallet_address,
      },
    });

    return !Boolean(result) ? null : result.getDataValue("user_id");
  }
}
