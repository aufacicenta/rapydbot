import { Sequelize } from "sequelize/types";
import { Wallet } from "../../database/wallet";
import { Controller } from "../../service/controller";

export interface IContext {
  controller: Controller;
  db: {
    driver: Sequelize;
    wallet: Wallet;
  };
}
