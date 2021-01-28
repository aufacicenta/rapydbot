import { injectable } from "inversify";
import { EncryptedPassportElement, Message } from "node-telegram-bot-api";
import "reflect-metadata";
import { BotFileHandler } from "./BotFileHandler";

@injectable()
export class BotPassportTypeFileHandler extends BotFileHandler {
  static type = "BotPassportTypeFileHandler";

  private static fileNamespace = "passport";
  private static frontSideFileName = `${BotPassportTypeFileHandler.fileNamespace}_front_side`;
  private static selfieFileName = `${BotPassportTypeFileHandler.fileNamespace}_selfie`;

  private encryptedPassportElement: EncryptedPassportElement;
  private msg: Message;

  private filePathsByFileType = {
    [BotPassportTypeFileHandler.frontSideFileName]: "",
    [BotPassportTypeFileHandler.selfieFileName]: "",
  };

  async processEncryptedData(data: EncryptedPassportElement, msg: Message) {
    this.encryptedPassportElement = data;
    this.msg = msg;

    await this.downloadPassportFile();
    this.decryptPassportData();
    this.decryptPassportFile();
  }

  private async downloadPassportFile() {
    await Promise.all([
      this.downloadFile(
        this.encryptedPassportElement.front_side.file_id,
        BotPassportTypeFileHandler.frontSideFileName,
        this.msg,
        (filePath) => {
          this.filePathsByFileType[
            BotPassportTypeFileHandler.frontSideFileName
          ] = filePath;
        }
      ),
      this.downloadFile(
        this.encryptedPassportElement.selfie.file_id,
        BotPassportTypeFileHandler.selfieFileName,
        this.msg,
        (filePath) => {
          this.filePathsByFileType[
            BotPassportTypeFileHandler.selfieFileName
          ] = filePath;
        }
      ),
    ]);
  }

  private decryptPassportData() {
    const passportData = this.decipherData<{
      document_no: string;
      expiry_date: string;
    }>(
      {
        secret: Buffer.from(
          this.credentials.secure_data.passport.data.secret,
          "base64"
        ),
        hash: this.credentials.secure_data.passport.data.data_hash,
      },
      this.encryptedPassportElement.data
    );

    // TODO do something with the passport data
  }

  private decryptPassportFile() {
    this.decipherFile(
      {
        secret: Buffer.from(
          this.credentials.secure_data.passport.front_side.secret,
          "base64"
        ),
        hash: this.credentials.secure_data.passport.front_side.file_hash,
      },
      this.filePathsByFileType[BotPassportTypeFileHandler.frontSideFileName]
    );

    this.decipherFile(
      {
        secret: Buffer.from(
          this.credentials.secure_data.passport.selfie.secret,
          "base64"
        ),
        hash: this.credentials.secure_data.passport.selfie.file_hash,
      },
      this.filePathsByFileType[BotPassportTypeFileHandler.selfieFileName]
    );

    // TODO do something with the passport data
  }
}
