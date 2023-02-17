export * from "../server/protos/schema_grpc_pb";
export * from "../server/protos/schema_pb";

import * as grpc from "@grpc/grpc-js";
import RapydClient from "../providers/rapyd/client";
import { WalletClient } from "../server/protos/schema_grpc_pb";
import getRandomUsername from "../__test__/util/getRandomUsername";

export class WalletClientGenerator {
  public url: string;

  constructor(url: string) {
    this.setURL(url);
  }

  setURL(url: string): WalletClientGenerator {
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

  getRandomUsername(): string {
    return getRandomUsername();
  }

  rapydHTTPClient() {
    return new RapydClient();
  }
}

export default WalletClientGenerator;
