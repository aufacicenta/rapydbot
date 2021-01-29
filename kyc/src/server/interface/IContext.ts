import { Sequelize } from "sequelize/types";
import { TelegramPassportDAO } from "../../database/dao/TelegramPassportDAO";
import { Controller } from "../../service/controller";

export interface IContext {
  controller: Controller;
  database?: Sequelize;
  dao?: {
    TelegramPassportDAO: TelegramPassportDAO;
  };
}
