import { Sequelize } from "sequelize/types";
import { UserDAO } from "../../database/user";
import { Controller } from "../../service/controller";

export interface IContext {
  controller: Controller;
  db: {
    driver: Sequelize;
    user: UserDAO;
  };
}
