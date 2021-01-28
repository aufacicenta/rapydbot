import container from "../service/container";
import { Controller, IController } from "../service/controller";
import { IContext } from "./interface/IContext";

const context: IContext = {
  controller: container.get<IController>(Controller.type),
  dao: {
    TelegramPassportDAO: undefined,
  },
};

export default context;
