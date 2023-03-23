import { Sequelize } from "sequelize";

import { Location } from "../../database/location";
import { Telegram } from "../../database/telegram";
import { User } from "../../database/user";
import { Controller } from "../../service/controller";

export type IContext = {
  controller: Controller;
  db: {
    driver: Sequelize;
    user: User;
    telegram: Telegram;
    location: Location;
  };
};
