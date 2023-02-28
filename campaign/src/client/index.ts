export * from "../server/protos/schema_grpc_pb";
export * from "../server/protos/schema_pb";

import * as grpc from "@grpc/grpc-js";

import { CampaignClient } from "../server/protos/schema_grpc_pb";

export class CampaignClientGenerator {
  public url: string;

  constructor(url: string) {
    this.setURL(url);
  }

  setURL(url: string): CampaignClientGenerator {
    this.url = url;

    return this;
  }

  create(): CampaignClient {
    const client = new CampaignClient(
      this.url,
      grpc.credentials.createInsecure(),
    ) as CampaignClient;

    return client;
  }
}

export default CampaignClientGenerator;
