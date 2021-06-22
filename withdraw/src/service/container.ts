import { Container, decorate, injectable } from "inversify";
import { Controller } from "./controller";

decorate(injectable(), Controller);

const container = new Container();

container.bind<Controller>(Controller.type).to(Controller).inSingletonScope();

export default container;
