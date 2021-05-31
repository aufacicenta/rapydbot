import { Sequelize } from "sequelize/types";
import { WalletDAO } from "../../database/dao/WalletDAO";
import { Controller } from "../../service/controller";

export interface IContext {
  controller: Controller;
  database?: Sequelize;
  dao?: {
    WalletDAO: WalletDAO;
  };
}
