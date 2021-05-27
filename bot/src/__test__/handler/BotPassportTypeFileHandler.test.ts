import { Message } from "node-telegram-bot-api";
import { Bot } from "../../Bot";
import { BotPassportTypeFileHandler } from "../../handler";
import telegramMSG from "../mock/telegram-msg.json";

describe("BotPassportTypeFileHandler", () => {
  const bot = new Bot();
  const handler = new BotPassportTypeFileHandler(bot);

  test("success: process encrypted data", async () => {
    await handler.processEncryptedData(telegramMSG as Message);
  });
});
