import { Bot } from "./Bot";
import server from "./webhooks/server";

(async () => {
  try {
    const webhooksServer = server.create();
    const bot = new Bot();

    webhooksServer.listen(process.env.RAPYD_WEBHOOKS_SERVER_PORT, async () => {
      console.log(`Express server listening on port ${process.env.RAPYD_WEBHOOKS_SERVER_PORT}`);

      (await bot.prepare()).listen();
    });

    webhooksServer.post("/rapyd", async (req, res) => {
      const body = req.body;
      console.log(body);

      if (body && body.type && body.type === "PAYMENT_COMPLETED") {
        await bot.balanceCommand.replyToPaymentCompleteWebhook(
          body.data.payment_method_data.metadata
        );
      }

      res.sendStatus(200);
    });
  } catch (error) {
    console.error(error);
  }
})();
