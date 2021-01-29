export * from "../server/protos/schema_grpc_pb";
export * from "../server/protos/schema_pb";

import grpc from "grpc";
import { KYCClient } from "../server/protos/schema_grpc_pb";

export class KYC_ClientGenerator {
  public url: string;

  constructor(url: string) {
    this.setURL(url);
  }

  setURL(url: string): KYC_ClientGenerator {
    this.url = url;
    return this;
  }

  create(): KYCClient {
    const client = new KYCClient(
      this.url,
      grpc.credentials.createInsecure()
    ) as KYCClient;

    return client;
  }
}

export default KYC_ClientGenerator;
