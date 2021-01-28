import { AufaXBot } from "./AufaXBot";
import { container } from "./container";
// import app from "./server";

// const PORT = 4000;

// app.listen(PORT, () => {
//   console.log(`Listening at http://localhost:${PORT}`);

// });
const bot = container.get<AufaXBot>(AufaXBot.type);
bot.init();
