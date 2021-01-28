import { Container } from "inversify";
import { AufaXBot } from "./AufaXBot";
import { BotFileHandler } from "./BotFileHandler";
import { BotPassportTypeFileHandler } from "./BotPassportTypeFileHandler";

const c = new Container();
c.bind<AufaXBot>(AufaXBot.type).to(AufaXBot).inSingletonScope();
c.bind<BotFileHandler>(BotFileHandler.type)
  .to(BotFileHandler)
  .inSingletonScope();
c.bind<BotPassportTypeFileHandler>(BotPassportTypeFileHandler.type).to(
  BotPassportTypeFileHandler
);

export const container = c;
export default c;
