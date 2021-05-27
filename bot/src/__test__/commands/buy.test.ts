import { Message } from "node-telegram-bot-api";
import { Bot } from "../../Bot";
import { BuyCommand } from "../../commands";
import { translationKeys } from "../../i18n";
import telegramMSG from "../mock/telegram-msg.json";

jest.mock("../../AufaXBot");

describe("command: buy", () => {
  const msg = telegramMSG as Message;

  const bot = new Bot();
  const command = new BuyCommand(bot);

  test("reply: invalid currency", async () => {
    msg.text = `/buy byg 123`;

    command.onText(msg);

    expect(bot.reply).toHaveBeenCalledWith(msg, translationKeys.buy_command_invalid_currency);
  });

  test("reply: invalid amount", async () => {
    msg.text = `/buy btc 123giberish`;

    command.onText(msg);

    expect(bot.reply).toHaveBeenCalledWith(msg, translationKeys.buy_command_invalid_amount);
  });

  test("reply: valid command text", async () => {
    msg.text = `/buy btc 0.123`;

    await command.onText(msg);

    expect(bot.reply).toHaveBeenCalledTimes(1);
  });
});
