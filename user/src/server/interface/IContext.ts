import { Sequelize } from "sequelize/types";
import { UserDAO } from "../../database/dao/UserDAO";
import { Controller } from "../../service/controller";

export interface IContext {
  controller: Controller;
  database?: Sequelize;
  dao?: {
    UserDAO: UserDAO;
  };
}
