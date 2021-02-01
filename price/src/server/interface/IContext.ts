import { Sequelize } from "sequelize/types";
import { PriceDAO } from "../../database/dao/PriceDAO";
import { Controller } from "../../service/controller";

export interface IContext {
  controller: Controller;
  database?: Sequelize;
  dao?: {
    PriceDAO: PriceDAO;
  };
}
