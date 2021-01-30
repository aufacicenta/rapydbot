import { AufaXBot } from "./AufaXBot";

(async () => {
  try {
    const bot = new AufaXBot();
    (await bot.prepare()).listen();
  } catch (error) {
    console.error(error);
  }
})();
