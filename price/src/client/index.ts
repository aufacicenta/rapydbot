export * from "../server/protos/schema_grpc_pb";
export * from "../server/protos/schema_pb";

import grpc from "grpc";
import { PriceClient } from "../server/protos/schema_grpc_pb";

export class Price_ClientGenerator {
  public url: string;

  constructor(url: string) {
    this.setURL(url);
  }

  setURL(url: string): Price_ClientGenerator {
    this.url = url;
    return this;
  }

  create(): PriceClient {
    const client = new PriceClient(
      this.url,
      grpc.credentials.createInsecure()
    ) as PriceClient;

    return client;
  }
}

export default Price_ClientGenerator;
