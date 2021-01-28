import { ModelCtor, Sequelize } from "sequelize";
import { v4 as uuid } from "uuid";
import { TelegramPassportModel } from "../model/TelegramPassportModel";

export class TelegramPassportDAO {
  private driver: Sequelize;
  private model: ModelCtor<TelegramPassportModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(TelegramPassportModel.tableName);
  }

  async createTelegramPassportData(data: {
    user_id: string;
    key_id: string;
    base64_encrypted_data: string;
  }): Promise<TelegramPassportModel> {
    const result = await this.model.create({
      user_id: uuid(),
      base64_encrypted_data: Buffer.from("some_string", "utf8").toString(
        "base64"
      ),
      key_id: uuid(),
    });

    return result;
  }
}
