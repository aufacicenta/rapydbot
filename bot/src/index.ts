import { Bot } from "./Bot";

(async () => {
  try {
    const bot = new Bot();
    (await bot.prepare()).listen();
  } catch (error) {
    console.error(error);
  }
})();
