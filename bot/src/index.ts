import { TGInformerBot } from "./tg-informer";
import server from "./webhooks/server";

const main = async () => {
  try {
    const webhooksServer = server.create();
    const bot = new TGInformerBot();

    webhooksServer.listen(process.env.RAPYD_WEBHOOKS_SERVER_PORT, async () => {
      console.log(`Express server listening on port ${process.env.RAPYD_WEBHOOKS_SERVER_PORT}`);

      await bot.prepare();
      bot.listen();
    });
  } catch (error) {
    console.error(error);
  }
};

main();
