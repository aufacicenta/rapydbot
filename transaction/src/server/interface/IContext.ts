import { Sequelize } from "sequelize/types";
import { TransactionDAO } from "../../database/dao/TransactionDAO";
import { Controller } from "../../service/controller";

export interface IContext {
  controller: Controller;
  database?: Sequelize;
  dao?: {
    TransactionDAO: TransactionDAO;
  };
}
