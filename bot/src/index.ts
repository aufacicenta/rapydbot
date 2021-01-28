import { AufaXBot } from "./AufaXBot";

try {
  const bot = new AufaXBot();
  bot.listen();
} catch (error) {
  console.error(error);
}
