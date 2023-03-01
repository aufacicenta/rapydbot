import * as grpc from "@grpc/grpc-js";

import { IContext } from "./interface/IContext";
import { CampaignService } from "./protos/schema_grpc_pb";

export default (context: IContext) => {
  const server = new grpc.Server();

  server.addService(CampaignService, {
    createCampaign: (call, callback) =>
      context.controller.createCampaign({ call, callback }, context),
    createCampaignAction: (call, callback) =>
      context.controller.createCampaignAction({ call, callback }, context),
    createCampaignActionMessage: (call, callback) =>
      context.controller.createCampaignActionMessage({ call, callback }, context),
    getCampaignActions: (call) => context.controller.getCampaignActions({ call }, context),
    getCampaignActionMessages: (call) =>
      context.controller.getCampaignActionMessages({ call }, context),
  });

  return server;
};
