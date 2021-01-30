import { ModelCtor, Sequelize } from "sequelize";
import { TransactionModel } from "../model/TransactionModel";

export class TransactionDAO {
  private driver: Sequelize;
  private model: ModelCtor<TransactionModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(TransactionModel.tableName);
  }

  async createUser({
    telegram_user_id,
  }: {
    telegram_user_id: number;
  }): Promise<TransactionModel> {
    const result = await this.model.create({
      telegram_user_id,
    });

    return result;
  }

  async findUserByTelegramUserIdOrCreateUser({
    telegram_user_id,
  }: {
    telegram_user_id: number;
  }): Promise<string> {
    const [model, success] = await this.model.findOrCreate({
      where: { telegram_user_id },
    });

    if (!Boolean(model.getDataValue("id"))) {
      throw new Error("findUserByTelegramUserIdOrCreateUser failed");
    }

    return await this.resolveUserIDFromTelegramUserID({ telegram_user_id });
  }

  async resolveUserIDFromTelegramUserID({
    telegram_user_id,
  }: {
    telegram_user_id: number;
  }): Promise<string> {
    const result = await this.model.findOne({ where: { telegram_user_id } });

    return result.getDataValue("id");
  }
}
