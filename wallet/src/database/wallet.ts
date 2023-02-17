import { ModelCtor, Sequelize } from "sequelize";
import { WalletServiceErrorCodes } from "../service/error";
import { WalletModel, WalletModelAttributes } from "./model";

export class Wallet {
  private driver: Sequelize;

  private model: ModelCtor<WalletModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(WalletModel.tableName);
  }

  async create({ user_id, rapyd_ewallet_address }: WalletModelAttributes) {
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

    if (!Boolean(result) || !result.getDataValue("id")) {
      throw new Error(
        WalletServiceErrorCodes.rapyd_ewallet_does_not_exist_for_user_id
      );
    }

    return result.getDataValue("id")!;
  }

  async getRapydWalletAddressByUserId({
    user_id,
  }: Pick<WalletModelAttributes, "user_id">) {
    const result = await this.model.findOne({
      where: {
        user_id,
      },
    });

    if (!Boolean(result) || !result.getDataValue("rapyd_ewallet_address")) {
      throw new Error(
        WalletServiceErrorCodes.rapyd_ewallet_does_not_exist_for_user_id
      );
    }

    return result.getDataValue("rapyd_ewallet_address")!;
  }

  async getUserIdByRapydEwalletAddress({
    rapyd_ewallet_address,
  }: Pick<WalletModelAttributes, "rapyd_ewallet_address">) {
    const result = await this.model.findOne({
      where: {
        rapyd_ewallet_address,
      },
    });

    if (!Boolean(result) || !result.getDataValue("user_id")) {
      throw new Error(WalletServiceErrorCodes.rapyd_ewallet_cannot_get_user_id);
    }

    return result.getDataValue("user_id")!;
  }

  async setCurrencyCode({
    id,
    rapyd_ewallet_currency_code: rapyd_ewallet_currency,
  }: Pick<WalletModelAttributes, "rapyd_ewallet_currency_code" | "id">) {
    const record = await this.model.findOne({ where: { id } });

    if (!record) {
      throw new Error(
        WalletServiceErrorCodes.ERROR_CANNOT_SET_USER_EWALLET_DEFAULT_CURRENCY
      );
    }

    record.set("rapyd_ewallet_currency_code", rapyd_ewallet_currency);

    await record.save();

    return rapyd_ewallet_currency!;
  }

  async getCurrencyCode({ user_id }: Pick<WalletModelAttributes, "user_id">) {
    const wallet = await this.model.findOne({ where: { user_id } });

    if (
      !Boolean(wallet) ||
      !wallet.getDataValue("rapyd_ewallet_currency_code")
    ) {
      throw new Error(
        WalletServiceErrorCodes.rapyd_ewallet_does_not_have_an_established_currency
      );
    }

    return wallet.getDataValue("rapyd_ewallet_currency_code")!;
  }

  async setCountryCode({
    id,
    rapyd_ewallet_country_code: rapyd_ewallet_country,
  }: Pick<WalletModelAttributes, "rapyd_ewallet_country_code" | "id">) {
    const record = await this.model.findOne({ where: { id } });

    if (!record) {
      throw new Error(
        WalletServiceErrorCodes.ERROR_CANNOT_SET_USER_EWALLET_DEFAULT_COUNTRY
      );
    }

    record.set("rapyd_ewallet_country_code", rapyd_ewallet_country);

    await record.save();

    return rapyd_ewallet_country!;
  }

  async getCountryCode({ user_id }: Pick<WalletModelAttributes, "user_id">) {
    const wallet = await this.model.findOne({ where: { user_id } });

    if (
      !Boolean(wallet) ||
      !wallet.getDataValue("rapyd_ewallet_country_code")
    ) {
      throw new Error(
        WalletServiceErrorCodes.rapyd_ewallet_does_not_have_an_established_country
      );
    }

    return wallet.getDataValue("rapyd_ewallet_country_code")!;
  }
}
