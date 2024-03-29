export * from "../server/protos/schema_grpc_pb";
export * from "../server/protos/schema_pb";

import * as grpc from "@grpc/grpc-js";

import { UserClient } from "../server/protos/schema_grpc_pb";

export class UserClientGenerator {
  public url: string;

  constructor(url: string) {
    this.setURL(url);
  }

  setURL(url: string): UserClientGenerator {
    this.url = url;

    return this;
  }

  create(): UserClient {
    const client = new UserClient(this.url, grpc.credentials.createInsecure()) as UserClient;

    return client;
  }
}

export default UserClientGenerator;
