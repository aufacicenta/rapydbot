import { Sequelize, SyncOptions } from "sequelize";

import { WalletModel } from "./model";

export default {
  async connect(options?: SyncOptions) {
    try {
      const sequelize = new Sequelize(process.env.MYSQL_URL, {
        dialect: "postgres",
      });

      sequelize.define(
        WalletModel.tableName,
        WalletModel.rawAttributes,
        WalletModel.config
      );

      await sequelize.authenticate();

      await sequelize.sync(options);

      console.log("Database Connection success");

      return sequelize;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
