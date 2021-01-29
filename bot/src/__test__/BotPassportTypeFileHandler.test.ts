import { Message } from "node-telegram-bot-api";
import { AufaXBot } from "../AufaXBot";
import { BotPassportTypeFileHandler } from "../handler";
import telegramMSG from "./mock/telegram-msg.json";

describe("BotPassportTypeFileHandler", () => {
  const bot = new AufaXBot();
  const handler = new BotPassportTypeFileHandler(bot);

  test("success: process encrypted data", async () => {
    await handler.processEncryptedData(telegramMSG as Message);
  });
});
