import { Sequelize } from "sequelize/types";
import { WithdrawDAO } from "../../database/dao/WithdrawDAO";
import { Controller } from "../../service/controller";

export interface IContext {
  controller: Controller;
  database?: Sequelize;
  dao?: {
    WithdrawDAO: WithdrawDAO;
  };
}
