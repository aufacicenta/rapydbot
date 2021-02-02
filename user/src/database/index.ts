import mysql from "mysql2/promise";
import { Sequelize, SyncOptions } from "sequelize";
import { TelegramModel } from "./model/TelegramModel";
import { UserModel } from "./model/UserModel";

const connectionURI = `mysql://root:root@localhost:3306/${process.env.MYSQL_DATABASE}`;

export default {
  async connect(options?: SyncOptions) {
    try {
      const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        user: process.env.MYSQL_ROOT_USER,
        password: process.env.MYSQL_ROOT_PASSWORD,
      });

      await connection.query(
        `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`
      );

      const sequelize = new Sequelize(connectionURI);

      const User = sequelize.define(
        UserModel.tableName,
        UserModel.rawAttributes,
        UserModel.config
      );

      const TelegramUser = sequelize.define(
        TelegramModel.tableName,
        TelegramModel.rawAttributes,
        TelegramModel.config
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
    }
  },
};
