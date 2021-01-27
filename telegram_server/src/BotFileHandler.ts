import crypto from "crypto";
import fs from "fs";
import { injectable } from "inversify";
import "reflect-metadata";
import { AufaXBot } from "./bot";
import { DataCredentials, StdCredentials } from "./bot/types";

@injectable()
export class BotFileHandler {
  private bot: AufaXBot;

  constructor(bot: AufaXBot) {
    this.bot = bot;
  }

  async downloadFile(fileID: string, path: string) {
    try {
      await this.bot.api.downloadFile(fileID, path);
    } catch (error) {
      console.error(error);
    }
  }

  decryptPassportCredentials<T>(credentials: DataCredentials, data: string): T {
    const privateKey = fs.readFileSync("../bot.key").toString();
    const decryptedSecret = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(credentials.secret as string, "base64")
    );

    return this.decipherData<T>(
      { secret: decryptedSecret, hash: credentials.data_hash },
      data
    );
  }

  decipherData<T>(credentials: StdCredentials, data: string): T {
    const decipherIV = this.getDecipheriv(credentials);
    let decrypted = decipherIV.update(data, "base64");
    decrypted = this.removePadding(decrypted);

    return JSON.parse(decrypted.toString());
  }

  decipherFile(credentials: StdCredentials, filePath: any) {
    const decipherIV = this.getDecipheriv(credentials);

    fs.readFile(filePath, (err, data) => {
      if (Boolean(err)) {
        console.log(err);
      }

      let decrypted = decipherIV.update(data);

      decrypted = this.removePadding(decrypted);

      fs.writeFile(filePath, decrypted, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  private removePadding(buffer: Buffer) {
    const paddingLength = buffer.readUIntBE(0, 1);
    return buffer.slice(paddingLength);
  }

  private getDecipheriv(credentials: StdCredentials) {
    const hash = crypto.createHash("sha512");

    const keys = hash
      .update(
        Buffer.concat([
          credentials.secret as Buffer,
          Buffer.from(credentials.hash, "base64"),
        ])
      )
      .digest();

    const credentialsKey = keys.slice(0, 32);
    const credentialsIV = keys.slice(32, 32 + 16);

    const credentialsHash = crypto.createDecipheriv(
      "aes-256-cbc",
      credentialsKey,
      credentialsIV
    );

    credentialsHash.setAutoPadding(false);

    return credentialsHash;
  }
}
