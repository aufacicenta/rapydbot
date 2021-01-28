import { ModelCtor, Sequelize } from "sequelize";
import { TelegramPassportModel } from "../model/TelegramPassportModel";

export class TelegramPassportDAO {
  private driver: Sequelize;
  private model: ModelCtor<TelegramPassportModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(TelegramPassportModel.tableName);
  }

  async createTelegramPassportData({
    user_id,
    key_id,
    base64_encrypted_data,
  }: {
    user_id: string;
    key_id: string;
    base64_encrypted_data: string;
  }): Promise<TelegramPassportModel> {
    const result = await this.model.create({
      user_id,
      base64_encrypted_data,
      key_id,
    });

    return result;
  }
}
