export * from "../server/protos/schema_grpc_pb";
export * from "../server/protos/schema_pb";

import grpc from "grpc";
import { WithdrawClient } from "../server/protos/schema_grpc_pb";

export class WithdrawClientGenerator {
  public url: string;

  constructor(url: string) {
    this.setURL(url);
  }

  setURL(url: string): WithdrawClientGenerator {
    this.url = url;
    return this;
  }

  create(): WithdrawClient {
    const client = new WithdrawClient(
      this.url,
      grpc.credentials.createInsecure()
    ) as WithdrawClient;

    return client;
  }
}

export default WithdrawClientGenerator;
