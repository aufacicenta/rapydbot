import { AufaXBot } from "../AufaXBot";
import { BotPassportTypeFileHandler } from "../handler";

describe("BotPassportTypeFileHandler", () => {
  const bot = new AufaXBot();
  const handler = new BotPassportTypeFileHandler(bot);

  test("success: publish passport data", async () => {
    handler.publishPassportData();
  });
});
