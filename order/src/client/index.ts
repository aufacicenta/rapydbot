export * from "../server/protos/schema_grpc_pb";
export * from "../server/protos/schema_pb";

import grpc from "grpc";
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

  create(): OrderClient {
    const client = new OrderClient(
      this.url,
      grpc.credentials.createInsecure()
    ) as OrderClient;

    return client;
  }
}

export default Order_ClientGenerator;
