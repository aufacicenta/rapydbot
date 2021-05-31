export * from "../server/protos/schema_grpc_pb";
export * from "../server/protos/schema_pb";

import grpc from "grpc";
import { WalletClient } from "../server/protos/schema_grpc_pb";

export class WALLET_ClientGenerator {
  public url: string;

  constructor(url: string) {
    this.setURL(url);
  }

  setURL(url: string): WALLET_ClientGenerator {
    this.url = url;
    return this;
  }

  create(): WalletClient {
    const client = new WalletClient(
      this.url,
      grpc.credentials.createInsecure()
    ) as WalletClient;

    return client;
  }
}

export default WALLET_ClientGenerator;
