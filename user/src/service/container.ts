import { Container } from "inversify";
import { Controller } from "./controller";

const container = new Container();

container.bind<Controller>(Controller.type).to(Controller).inSingletonScope();

export default container;
