import { Sequelize } from "sequelize/types";
import { TelegramPassportDAO } from "../../database/dao/TelegramPassportDAO";
import { IController } from "../../service/controller";

export interface IContext {
  controller: IController;
  database?: Sequelize;
  dao?: {
    TelegramPassportDAO: TelegramPassportDAO;
  };
}
