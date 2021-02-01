import { ModelCtor, Sequelize } from "sequelize";
import { PriceModel } from "../model/PriceModel";

export class PriceDAO {
  private driver: Sequelize;
  private model: ModelCtor<PriceModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(PriceModel.tableName);
  }

  async createPrice(price: number, from_currency: string, to_currency: string) {
    const result = await this.model.create({
      price,
      from_currency: from_currency.toUpperCase(),
      to_currency: to_currency.toUpperCase(),
    });

    return result.getDataValue("id");
  }
}
