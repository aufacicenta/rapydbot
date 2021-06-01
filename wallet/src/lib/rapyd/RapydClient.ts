import axios from "axios";
import * as Crypto from "crypto-js";
import moment from "moment";
import {
  HttpMethods,
  IRapydClient,
  IRapydRequestParams,
  RequestSignature,
} from "./types";

class RapydClient implements IRapydClient {
  post<T>({ path, body }: IRapydRequestParams<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { BASE_URL, SALT_QTY, ACCESS_KEY, SECRET_KEY } = process.env;

      const method = HttpMethods.POST;
      const salt = Crypto.lib.WordArray.random(Number(SALT_QTY)).toString();
      const completeUrl = `${BASE_URL}${path}`;

      const signature = this.generateRequestSignature({
        method,
        path,
        salt,
        accessKey: ACCESS_KEY,
        secretKey: SECRET_KEY,
        body,
      });

      const requestConfig = this.buildRequestConfig({
        accessKey: ACCESS_KEY,
        salt,
        signature,
      });

      axios
        .post(completeUrl, body, requestConfig)
        .then((response) => {
          const { data } = response;
          resolve(data as T);
        })
        .catch((err) => reject(err));
    });
  }

  get<T>({ path, body }: IRapydRequestParams<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { BASE_URL, SALT_QTY, ACCESS_KEY, SECRET_KEY } = process.env;

      const method = HttpMethods.GET;
      const salt = Crypto.lib.WordArray.random(Number(SALT_QTY)).toString();
      const completeUrl = `${BASE_URL}${path}`;

      const signature = this.generateRequestSignature({
        method,
        path,
        salt,
        accessKey: ACCESS_KEY,
        secretKey: SECRET_KEY,
        body,
      });

      const requestConfig = this.buildRequestConfig({
        accessKey: ACCESS_KEY,
        salt,
        signature,
      });

      axios
        .get(completeUrl, requestConfig)
        .then((response) => {
          const { data } = response;
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  put<T>({ path, body }: IRapydRequestParams<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { BASE_URL, SALT_QTY, ACCESS_KEY, SECRET_KEY } = process.env;

      const method = HttpMethods.PUT;
      const salt = Crypto.lib.WordArray.random(Number(SALT_QTY)).toString();
      const completeUrl = `${BASE_URL}${path}`;

      const signature = this.generateRequestSignature({
        method,
        path,
        salt,
        accessKey: ACCESS_KEY,
        secretKey: SECRET_KEY,
        body,
      });

      const requestConfig = this.buildRequestConfig({
        accessKey: ACCESS_KEY,
        salt,
        signature,
      });

      axios
        .put(completeUrl, body, requestConfig)
        .then((response) => {
          const { data } = response;
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  delete<T>({ path, body }: IRapydRequestParams<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { BASE_URL, SALT_QTY, ACCESS_KEY, SECRET_KEY } = process.env;

      const method = HttpMethods.DELETE;
      const salt = Crypto.lib.WordArray.random(Number(SALT_QTY)).toString();
      const completeUrl = `${BASE_URL}${path}`;

      const signature = this.generateRequestSignature({
        method,
        path,
        salt,
        accessKey: ACCESS_KEY,
        secretKey: SECRET_KEY,
        body,
      });

      const requestConfig = this.buildRequestConfig({
        accessKey: ACCESS_KEY,
        salt,
        signature,
      });

      axios
        .delete(completeUrl, requestConfig)
        .then((response) => {
          const { data } = response;
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  private buildRequestConfig({ accessKey, salt, signature }) {
    const timestamp = moment().unix();
    const requestConfig = {
      headers: {
        salt,
        signature,
        timestamp,
        access_key: accessKey,
        "Content-Type": "application/json",
      },
    };

    return requestConfig;
  }

  /**
   * When we send an HTTPS REST request to the Rapyd Payments platform, we must sign it.
   * The signature is required both for the production platform and the sandbox.
   * https://docs.rapyd.net/build-with-rapyd/reference/message-security
   */
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
