export * from "../server/protos/schema_grpc_pb";
export * from "../server/protos/schema_pb";

import grpc, { VerifyOptions } from "grpc";
import { UserClient } from "../server/protos/schema_grpc_pb";

export class User_ClientGenerator {
  public url: string;

  constructor(url: string) {
    this.setURL(url);
  }

  setURL(url: string): User_ClientGenerator {
    this.url = url;
    return this;
  }

  create(credentials?: {
    rootCerts?: Buffer;
    privateKey?: Buffer;
    certChain?: Buffer;
    verifyOptions?: VerifyOptions;
  }): UserClient {
    const channelCredentials = Boolean(credentials)
      ? grpc.credentials.createSsl(
          credentials.rootCerts,
          credentials.privateKey,
          credentials.certChain,
          credentials.verifyOptions
        )
      : grpc.credentials.createInsecure();

    const client = new UserClient(this.url, channelCredentials);

    return client;
  }
}

export default User_ClientGenerator;
