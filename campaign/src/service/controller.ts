import * as grpc from "@grpc/grpc-js";

import { IContext } from "../server/interface/IContext";
import {
  CreateCampaignActionReply,
  CreateCampaignActionRequest,
  CreateCampaignReply,
  CreateCampaignRequest,
} from "../server/protos/schema_pb";

type GRPCUnaryCall<Request, Reply> = {
  call: grpc.ServerUnaryCall<Request, Reply>;
  callback: grpc.sendUnaryData<Reply>;
};

export class Controller {
  public static type: string = "Controller";

  async createCampaign(
    { call, callback }: GRPCUnaryCall<CreateCampaignRequest, CreateCampaignReply>,
    { db }: IContext,
  ) {
    try {
      const user_id = call.request.getUserId();
      const message_id = call.request.getMessageId();

      const { campaignId } = await db.campaign.create({ user_id, message_id });

      const reply = new CreateCampaignReply();

      reply.setCampaignId(campaignId);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async createCampaignAction(
    { call, callback }: GRPCUnaryCall<CreateCampaignActionRequest, CreateCampaignActionReply>,
    { db }: IContext,
  ) {
    try {
      const campaign_id = call.request.getCampaignId();
      const initial_instruction = call.request.getInitialInstruction();
      const reply = call.request.getReply();
      const intent_action = call.request.getIntentAction();

      const { campaignActionId } = await db.campaignActions.create({
        campaign_id,
        initial_instruction,
        reply,
        intent_action,
      });

      const r = new CreateCampaignActionReply();

      r.setCampaignActionId(campaignActionId);

      callback(null, r);
    } catch (error) {
      callback(error, null);
    }
  }
}
