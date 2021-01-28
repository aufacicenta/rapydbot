import { SecureData } from "../bot/types";
import { BotFileHandler } from "../BotFileHandler";
import { container } from "../container";
import encryptedPassportData from "./mock/passport-data.json";

describe("BotFileHandler", () => {
  const handler = container.get<BotFileHandler>(BotFileHandler.type);

  test("Decrypt image file", () => {
    const credentials = handler.decryptPassportCredentials<SecureData>(
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
