import mysql from "mysql2/promise";
import { Sequelize, SyncOptions } from "sequelize";
import { TransactionModel } from "./model/TransactionModel";

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

      sequelize.define(
        TransactionModel.tableName,
        TransactionModel.rawAttributes,
        TransactionModel.config
      );

      await sequelize.authenticate();

      await sequelize.sync(options);

      console.log("Database Connection success");
      return sequelize;
    } catch (error) {
      console.error(error);
    }
  },
};
