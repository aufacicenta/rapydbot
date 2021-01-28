import {
  client as KYCServiceClient,
  ProcessPassportDataRequest,
} from "@aufax/kyc/client";
import { EncryptedPassportElement, Message } from "node-telegram-bot-api";
import { v4 as uuid } from "uuid";
import { DecryptedPassportData } from "../types";
import { BotEncryptedDataHandler } from "./BotEncryptedDataHandler";

export class BotPassportTypeFileHandler extends BotEncryptedDataHandler {
  private static fileNamespace = "passport";
  private static frontSideFileName = `${BotPassportTypeFileHandler.fileNamespace}_front_side`;
  private static selfieFileName = `${BotPassportTypeFileHandler.fileNamespace}_selfie`;

  private encryptedPassportElement: EncryptedPassportElement;
  private msg: Message;

  private filePathsByFileType = {
    [BotPassportTypeFileHandler.frontSideFileName]: "",
    [BotPassportTypeFileHandler.selfieFileName]: "",
  };

  async processEncryptedData(msg: Message) {
    this.msg = msg;

    const request = new ProcessPassportDataRequest();

    const base64_encrypted_data = Buffer.from(
      JSON.stringify(msg.passport_data),
      "utf-8"
    ).toString("base64");

    request.setBase64EncryptedData(base64_encrypted_data);
    request.setKeyId(uuid());
    request.setUserId(uuid());

    KYCServiceClient.processPassportData(request, (err, response) => {
      if (Boolean(err)) {
        console.log(err);
        return;
      }

      console.log(`ProcessPassportDataRequest: ${response.getOnSuccess()}`);
    });
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
    const credentials = this.credentials;

    const passportData = this.decipherData<DecryptedPassportData>(
      {
        secret: Buffer.from(
          credentials.secure_data.passport.data.secret,
          "base64"
        ),
        hash: credentials.secure_data.passport.data.data_hash,
      },
      this.encryptedPassportElement.data
    );
  }

  private decryptPassportFile() {
    const credentials = this.credentials;

    this.decipherFile(
      {
        secret: Buffer.from(
          credentials.secure_data.passport.front_side.secret,
          "base64"
        ),
        hash: credentials.secure_data.passport.front_side.file_hash,
      },
      this.filePathsByFileType[BotPassportTypeFileHandler.frontSideFileName]
    );

    this.decipherFile(
      {
        secret: Buffer.from(
          credentials.secure_data.passport.selfie.secret,
          "base64"
        ),
        hash: credentials.secure_data.passport.selfie.file_hash,
      },
      this.filePathsByFileType[BotPassportTypeFileHandler.selfieFileName]
    );

    // TODO do something with the files
  }
}
