import mysql from "mysql2/promise";
import { Sequelize, SyncOptions } from "sequelize";
import { WalletModel } from "./model/WalletModel";

const opts = {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_ROOT_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
};

export default {
  async connect(options?: SyncOptions) {
    try {
      // const connection = await mysql.createConnection(opts);

      // await connection.query(
      //   `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`
      // );

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
