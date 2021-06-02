import axios from "axios";
import crypto from "crypto";
import generateSalt from "../crypto/generateSalt";
import { HttpMethods, IRapydRequestParams, RequestSignature } from "./types";

const {
  RAPYD_BASE_URL,
  RAPYD_ACCESS_KEY: accessKey,
  RAPYD_SECRET_KEY: secretKey,
} = process.env;

class RapydClient {
  post<T = Response, B = Body>({
    path,
    body,
  }: IRapydRequestParams<B>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const method = HttpMethods.POST;
      const salt = generateSalt();
      const completeUrl = `${RAPYD_BASE_URL}${path}`;
      const timestamp = this.getTimestamp();
      const idempotency = this.getIdempotency();

      const signature = this.generateRequestSignature({
        method,
        path,
        salt,
        accessKey,
        secretKey,
        body,
        timestamp,
      });

      const requestConfig = this.buildRequestConfig({
        accessKey,
        salt,
        signature,
        timestamp,
        idempotency,
      });

      axios
        .post(completeUrl, body, requestConfig)
        .then((response) => {
          const { data } = response.data;
          resolve(data as T);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = Response>({ path }: IRapydRequestParams<any>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const method = HttpMethods.GET;
      const salt = generateSalt();
      const completeUrl = `${RAPYD_BASE_URL}${path}`;
      const timestamp = this.getTimestamp();
      const idempotency = this.getIdempotency();

      const signature = this.generateRequestSignature({
        method,
        path,
        salt,
        accessKey,
        secretKey,
        timestamp,
      });

      const requestConfig = this.buildRequestConfig({
        accessKey,
        salt,
        signature,
        timestamp,
        idempotency,
      });

      axios
        .get(completeUrl, requestConfig)
        .then((response) => {
          const { data } = response.data;
          resolve(data as T);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  put<T = Response, B = Body>({
    path,
    body,
  }: IRapydRequestParams<B>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const method = HttpMethods.PUT;
      const salt = generateSalt();
      const completeUrl = `${RAPYD_BASE_URL}${path}`;
      const timestamp = this.getTimestamp();
      const idempotency = this.getIdempotency();

      const signature = this.generateRequestSignature({
        method,
        path,
        salt,
        accessKey,
        secretKey,
        body,
        timestamp,
      });

      const requestConfig = this.buildRequestConfig({
        accessKey,
        salt,
        signature,
        timestamp,
        idempotency,
      });

      axios
        .put(completeUrl, body, requestConfig)
        .then((response) => {
          const { data } = response.data;
          resolve(data as T);
        })
        .catch((err) => reject(err));
    });
  }

  delete<T = Response, B = Body>({
    path,
    body,
  }: IRapydRequestParams<B>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const method = HttpMethods.DELETE;
      const salt = generateSalt();
      const completeUrl = `${RAPYD_BASE_URL}${path}`;
      const timestamp = this.getTimestamp();
      const idempotency = this.getIdempotency();

      const signature = this.generateRequestSignature({
        method,
        path,
        salt,
        accessKey,
        secretKey,
        body,
        timestamp,
      });

      const requestConfig = this.buildRequestConfig({
        accessKey,
        salt,
        signature,
        timestamp,
        idempotency,
      });

      axios
        .delete(completeUrl, requestConfig)
        .then((response) => {
          const { data } = response.data;
          resolve(data as T);
        })
        .catch((err) => reject(err));
    });
  }

  private buildRequestConfig({
    accessKey,
    salt,
    signature,
    idempotency,
    timestamp,
  }) {
    const requestConfig = {
      headers: {
        salt,
        signature,
        timestamp,
        idempotency,
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
    timestamp,
    body,
  }: RequestSignature) {
    const toSign = `${method.toLowerCase()}${path}${salt}${timestamp}${accessKey}${secretKey}${
      Boolean(body) ? JSON.stringify(body) : ""
    }`;

    const hash = crypto.createHmac("sha256", secretKey);
    hash.update(toSign);
    const signature = Buffer.from(hash.digest("hex")).toString("base64");

    return signature;
  }

  private getTimestamp() {
    return Math.round(new Date().getTime() / 1000);
  }

  private getIdempotency() {
    return new Date().getTime().toString();
  }
}

export default RapydClient;
