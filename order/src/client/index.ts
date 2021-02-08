export * from "../server/protos/schema_grpc_pb";
export * from "../server/protos/schema_pb";

import grpc, { VerifyOptions } from "grpc";
import { OrderClient } from "../server/protos/schema_grpc_pb";

export class Order_ClientGenerator {
  public url: string;

  constructor(url: string) {
    this.setURL(url);
  }

  setURL(url: string): Order_ClientGenerator {
    this.url = url;
    return this;
  }

  create(credentials?: {
    rootCerts?: Buffer;
    privateKey?: Buffer;
    certChain?: Buffer;
    verifyOptions?: VerifyOptions;
  }): OrderClient {
    const channelCredentials = Boolean(credentials)
      ? grpc.credentials.createSsl(
          credentials.rootCerts,
          credentials.privateKey,
          credentials.certChain,
          credentials.verifyOptions
        )
      : grpc.credentials.createInsecure();

    const client = new OrderClient(this.url, channelCredentials);

    return client;
  }
}

export default Order_ClientGenerator;
