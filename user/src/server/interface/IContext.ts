import { Sequelize } from "sequelize";

import { User } from "../../database/user";
import { Controller } from "../../service/controller";

export type IContext = {
  controller: Controller;
  db: {
    driver: Sequelize;
    user: User;
  };
};
