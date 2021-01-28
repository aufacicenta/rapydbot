import { Sequelize } from "sequelize/types";
import { v4 as uuid } from "uuid";
import database from "../../../database";
import { TelegramPassport } from "../../../database/model/telegram_passport.model";

let driver: Sequelize;

describe("database:model:telegram_passport", () => {
  beforeAll(async () => {
    driver = await database.connect({ force: true });
  });

  test("success: insert values to telegram_passport table", async () => {
    const model = driver.model(TelegramPassport.table_name);

    const result = await model.create({
      user_id: uuid(),
      base64_encrypted_data: Buffer.from("some_string", "utf8").toString(
        "base64"
      ),
      key_id: uuid(),
    });

    console.log(result);
  });
});
