import { AufaXBot } from "../AufaXBot";
import { BotEncryptedDataHandler } from "../handler";
import { SecureData } from "../types";
import encryptedPassportData from "./mock/passport-data.json";

describe("BotFileHandler", () => {
  const bot = new AufaXBot();
  const handler = new BotEncryptedDataHandler(bot);

  test("Decrypt image file", async () => {
    const credentials = await handler.decryptPassportCredentials<SecureData>(
      {
        secret: encryptedPassportData.credentials.secret,
        data_hash: encryptedPassportData.credentials.hash,
      },
      encryptedPassportData.credentials.data
    );

    const passportData = handler.decipherData<{
      document_no: string;
      expiry_date: string;
    }>(
      {
        secret: Buffer.from(
          credentials.secure_data.passport.data.secret,
          "base64"
        ),
        hash: credentials.secure_data.passport.data.data_hash,
      },
      encryptedPassportData.data.filter((d) => d.type === "passport")[0]
        .data as string
    );

    const passportFile = handler.decipherFile(
      {
        secret: Buffer.from(
          credentials.secure_data.passport.front_side.secret,
          "base64"
        ),
        hash: credentials.secure_data.passport.front_side.file_hash,
      },
      "./assets/file_0.jpg"
    );
  });
});
