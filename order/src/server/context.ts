import container from "../service/container";
import { Controller } from "../service/controller";
import { IContext } from "./interface/IContext";

const context: IContext = {
  controller: container.get<Controller>(Controller.type),
  dao: {
    OrderDAO: undefined,
  },
};

export default context;
