export * from "../server/protos/schema_grpc_pb";
export * from "../server/protos/schema_pb";

import * as grpc from "@grpc/grpc-js";

import { IntentRecognitionClient } from "../server/protos/schema_grpc_pb";

export class IntentRecognitionClientGenerator {
  public url: string;

  constructor(url: string) {
    this.setURL(url);
  }

  setURL(url: string): IntentRecognitionClientGenerator {
    this.url = url;

    return this;
  }

  create(): IntentRecognitionClient {
    const client = new IntentRecognitionClient(
      this.url,
      grpc.credentials.createInsecure(),
    ) as IntentRecognitionClient;

    return client;
  }
}

export default IntentRecognitionClientGenerator;
