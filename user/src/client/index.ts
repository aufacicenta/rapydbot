export * from "../server/protos/schema_grpc_pb";
export * from "../server/protos/schema_pb";

import grpc from "grpc";
import { USERClient } from "../server/protos/schema_grpc_pb";

export class USER_ClientGenerator {
  public url: string;

  constructor(url: string) {
    this.setURL(url);
  }

  setURL(url: string): USER_ClientGenerator {
    this.url = url;
    return this;
  }

  create(): USERClient {
    const client = new USERClient(
      this.url,
      grpc.credentials.createInsecure()
    ) as USERClient;

    return client;
  }
}

export default USER_ClientGenerator;
