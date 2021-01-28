import { Sequelize, SyncOptions } from "sequelize";
import { TelegramPassportModel } from "./model/TelegramPassportModel";

const sequelize = new Sequelize("mysql://root:root@localhost:3306/KYC");

sequelize.define(
  TelegramPassportModel.tableName,
  TelegramPassportModel.rawAttributes,
  TelegramPassportModel.config
);

export default {
  async connect(options?: SyncOptions) {
    try {
      await sequelize.authenticate();
      await sequelize.sync(options);

      console.log("Database Connection success");
      return sequelize;
    } catch (error) {
      console.error(error);
    }
  },
};
