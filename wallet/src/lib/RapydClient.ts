import axios from "axios";
import * as Crypto from "crypto-js";
import moment from "moment";
import config from "../server/config";
import {
  HttpMethods,
  IRapydClient,
  IRapydRequestParams,
  RequestSignature,
} from "./types";

class RapydClient implements IRapydClient {
  post<T>({ path, body }: IRapydRequestParams<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { baseUrl, saltQty, accessKey, secretKey } = config.get("rapyd");

      const method = HttpMethods.GET;
      const salt = Crypto.lib.WordArray.random(saltQty);
      const completeUrl = `${baseUrl}${path}`;

      const signature = this.generateRequestSignature({
        method,
        path,
        salt,
        accessKey,
        secretKey,
        body,
      });

      const requestOptions = this.buildOptions({
        accessKey,
        salt,
        signature,
      });

      axios
        .post(completeUrl, body, requestOptions)
        .then((response) => {
          const { data } = response;

          resolve(data as T);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T>({ path, body }: IRapydRequestParams<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      try {
        const method = HttpMethods.POST;
        const { baseUrl, salt, accessKey, secretKey } = config.get("rapyd");
      } catch (error) {
        reject(error);
      }
    });
  }

  private buildOptions({ accessKey, salt, signature }) {
    const timestamp = moment().unix();
    const requestOptions = {
      headers: {
        salt,
        signature,
        timestamp,
        access_key: accessKey,
        "Content-Type": "application/json",
      },
    };

    return requestOptions;
  }

  private generateRequestSignature({
    method,
    path,
    salt,
    accessKey,
    secretKey,
    body,
  }: RequestSignature) {
    const timestamp = moment().unix();
    const toSign = `${method}${path}${salt}${timestamp}${accessKey}${secretKey}${body}`;

    const hash = Crypto.HmacSHA256(toSign, secretKey);
    const signature = Crypto.enc.Hex.stringify(hash);

    const signatureFormatted = Crypto.enc.Utf8.parse(signature);
    const requestSignature = Crypto.enc.Base64.stringify(signatureFormatted);

    return requestSignature;
  }
}

export default RapydClient;
