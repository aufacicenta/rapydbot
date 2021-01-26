import { AufaXBot } from "./bot";
import app from "./server";

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);

  const bot = new AufaXBot();
  bot.init();
});
