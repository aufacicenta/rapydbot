import { Sequelize, SyncOptions } from "sequelize";
import { TelegramPassport } from "./model/telegram_passport.model";

const sequelize = new Sequelize("mysql://root:root@localhost:3306/KYC");

sequelize.define(
  TelegramPassport.table_name,
  TelegramPassport.model,
  TelegramPassport.config
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
