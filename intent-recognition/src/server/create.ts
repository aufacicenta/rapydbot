import * as grpc from "@grpc/grpc-js";

import { IContext } from "./interface/IContext";
import { IntentRecognitionService } from "./protos/schema_grpc_pb";

export default (context: IContext) => {
  const server = new grpc.Server();

  server.addService(IntentRecognitionService, {
    classify: (call, callback) => context.controller.classify({ call, callback }, context),
  });

  return server;
};
