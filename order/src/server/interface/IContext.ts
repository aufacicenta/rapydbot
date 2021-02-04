import { Sequelize } from "sequelize/types";
import { OrderDAO } from "../../database/dao/OrderDAO";
import { Controller } from "../../service/controller";

export interface IContext {
  controller: Controller;
  database?: Sequelize;
  dao?: {
    OrderDAO: OrderDAO;
  };
}
