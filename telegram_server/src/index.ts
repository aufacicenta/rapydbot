import { AufaXBot } from "./AufaXBot";
// import app from "./server";

// const PORT = 4000;

// app.listen(PORT, () => {
//   console.log(`Listening at http://localhost:${PORT}`);

// });
try {
  const bot = new AufaXBot();
  bot.init();
} catch (error) {
  console.error(error);
}
