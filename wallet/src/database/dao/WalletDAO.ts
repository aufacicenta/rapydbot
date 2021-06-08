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

  async getRapydWalletAddressByUserId({
    user_id,
  }: Pick<WalletModelAttributes, "user_id">) {
    const result = await this.model.findOne({
      where: {
        user_id,
      },
    });

    return !Boolean(result)
      ? null
      : result.getDataValue("rapyd_ewallet_address");
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

  async setWalletDefaultCurrency({
    id,
    rapyd_ewallet_currency_code: rapyd_ewallet_currency,
  }: Pick<WalletModelAttributes, "rapyd_ewallet_currency_code" | "id">) {
    const record = await this.model.findOne({ where: { id } });
    const wallet_id = record.getDataValue("id");

    if (!Boolean(wallet_id)) {
      return null;
    }

    record.set("rapyd_ewallet_currency_code", rapyd_ewallet_currency);

    await record.save();

    return rapyd_ewallet_currency;
  }

  async getWalletCurrencyCode({
    user_id,
  }: Pick<WalletModelAttributes, "user_id">) {
    const wallet = await this.model.findOne({ where: { user_id } });

    return !Boolean(wallet)
      ? null
      : {
          ewallet_address: wallet.getDataValue("rapyd_ewallet_address"),
          ewallet_established_currency: wallet.getDataValue(
            "rapyd_ewallet_currency_code"
          ),
        };
  }

  async setWalletDefaultCountry({
    id,
    rapyd_ewallet_country_code: rapyd_ewallet_country,
  }: Pick<WalletModelAttributes, "rapyd_ewallet_country_code" | "id">) {
    const walletToUpdate = await this.model.findOne({ where: { id } });
    const wallet_id = walletToUpdate.getDataValue("id");

    if (!Boolean(wallet_id)) {
      return null;
    }

    walletToUpdate.set("rapyd_ewallet_country_code", rapyd_ewallet_country);

    await walletToUpdate.save();

    return rapyd_ewallet_country;
  }

  async getWalletCountryCode({
    user_id,
  }: Pick<WalletModelAttributes, "user_id">) {
    const wallet = await this.model.findOne({ where: { user_id } });

    return !Boolean(wallet)
      ? null
      : {
          ewallet_address: wallet.getDataValue("rapyd_ewallet_address"),
          ewallet_established_country: wallet.getDataValue(
            "rapyd_ewallet_country_code"
          ),
        };
  }
}
