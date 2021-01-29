import {
  KYC_ClientGenerator,
  ProcessPassportDataRequest,
} from "@aufax/kyc/client";
import {
  CreateUserRequest,
  ResolveUserIDFromTelegramUserIDRequest,
  USER_ClientGenerator,
} from "@aufax/user/client";
import { EncryptedPassportElement, Message } from "node-telegram-bot-api";
import { v4 as uuid } from "uuid";
import { translationKeys } from "../i18n";
import { DecryptedPassportData } from "../types";
import { BotEncryptedDataHandler } from "./BotEncryptedDataHandler";

const KYCServiceClient = new KYC_ClientGenerator("127.0.0.1:30040").create();
const UserServiceClient = new USER_ClientGenerator("127.0.0.1:30041").create();

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

  async processEncryptedData(msg: Message): Promise<void> {
    return new Promise((resolve, reject) => {
      const kycServiceRequest = new ProcessPassportDataRequest();
      const createUserRequest = new CreateUserRequest();
      const resolveUserIDFromTelegramUserIDRequest = new ResolveUserIDFromTelegramUserIDRequest();

      createUserRequest.setTelegramUserId(msg.from.id);

      UserServiceClient.findUserByTelegramUserIdOrCreateUser(
        createUserRequest,
        (err, response) => {
          if (Boolean(err)) {
            reject(err);
          }

          const id = response.getId();

          const base64_encrypted_data = Buffer.from(
            JSON.stringify(msg.passport_data),
            "utf-8"
          ).toString("base64");

          kycServiceRequest.setUserId(id);
          kycServiceRequest.setBase64EncryptedData(base64_encrypted_data);
          kycServiceRequest.setKeyId(uuid()); // TODO create service to manage encryption keys

          KYCServiceClient.processPassportData(
            kycServiceRequest,
            (err, response) => {
              if (Boolean(err)) {
                reject(err);
              }

              console.log(
                `ProcessPassportDataRequest: ${response.getOnSuccess()}`
              );

              this.bot.reply(
                msg,
                translationKeys.passport_data_process_encrypted_data_success
              );

              resolve();
            }
          );
        }
      );
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
