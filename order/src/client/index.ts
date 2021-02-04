export * from "../server/protos/schema_grpc_pb";
export * from "../server/protos/schema_pb";

import grpc from "grpc";
import { TransactionClient } from "../server/protos/schema_grpc_pb";

export class Order_ClientGenerator {
  public url: string;

  constructor(url: string) {
    this.setURL(url);
  }

  setURL(url: string): Order_ClientGenerator {
    this.url = url;
    return this;
  }

  create(): TransactionClient {
    const client = new TransactionClient(
      this.url,
      grpc.credentials.createInsecure()
    ) as TransactionClient;

    return client;
  }
}

export default Order_ClientGenerator;
