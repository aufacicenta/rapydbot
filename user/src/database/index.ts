import { Sequelize, SyncOptions } from "sequelize";
import { TelegramModel } from "./model/telegram";
import { UserModel } from "./model/user";

export default {
  async connect(options?: SyncOptions) {
    try {
      const sequelize = new Sequelize(process.env.MYSQL_URL, {
        dialect: "postgres",
      });

      const User = sequelize.define(
        UserModel.tableName,
        UserModel.rawAttributes,
        UserModel.config,
      );

      const TelegramUser = sequelize.define(
        TelegramModel.tableName,
        TelegramModel.rawAttributes,
        TelegramModel.config,
      );

      User.hasOne(TelegramUser, {
        foreignKey: { allowNull: true },
      });

      TelegramUser.belongsTo(User, {
        foreignKey: { allowNull: true },
      });

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
