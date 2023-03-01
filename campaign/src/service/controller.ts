import * as grpc from "@grpc/grpc-js";

import { IContext } from "../server/interface/IContext";
import {
  CreateCampaignActionMessageReply,
  CreateCampaignActionMessageRequest,
  CreateCampaignActionReply,
  CreateCampaignActionRequest,
  CreateCampaignReply,
  CreateCampaignRequest,
  CreateCampaignUserReply,
  CreateCampaignUserRequest,
  GetCampaignActionsReply,
  GetCampaignActionsRequest,
} from "../server/protos/schema_pb";

type GRPCUnaryCall<Request, Reply> = {
  call: grpc.ServerUnaryCall<Request, Reply>;
  callback: grpc.sendUnaryData<Reply>;
};

type gRPCServerStreamingCall<Request, Reply> = {
  call: grpc.ServerWritableStream<Request, Reply>;
};

export class Controller {
  public static type: string = "Controller";

  async createCampaign(
    { call, callback }: GRPCUnaryCall<CreateCampaignRequest, CreateCampaignReply>,
    { db }: IContext,
  ) {
    try {
      const issuerId = call.request.getIssuerId();

      const { campaignId } = await db.campaign.create({ issuerId });

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

      const { campaignActionId } = await db.campaignAction.create({
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

  async createCampaignActionMessage(
    {
      call,
      callback,
    }: GRPCUnaryCall<CreateCampaignActionMessageRequest, CreateCampaignActionMessageReply>,
    { db }: IContext,
  ) {
    try {
      const campaign_action_id = call.request.getCampaignActionId();
      const user_id = call.request.getUserId();
      const message = call.request.getMessage();

      const { id } = await db.campaignActionMessage.create({
        campaign_action_id,
        user_id,
        message,
      });

      const reply = new CreateCampaignActionMessageReply();

      reply.setId(id);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async createCampaignUser(
    { call, callback }: GRPCUnaryCall<CreateCampaignUserRequest, CreateCampaignUserReply>,
    { db }: IContext,
  ) {
    try {
      const campaignId = call.request.getCampaignId();
      const userId = call.request.getUserId();
      const messageId = call.request.getMessageId();

      await db.campaignUser.create({
        campaignId,
        userId,
        messageId,
      });

      const reply = new CreateCampaignUserReply();

      reply.setCampaignId(campaignId);
      reply.setUserId(userId);
      reply.setMessageId(messageId);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async getCampaignActions(
    { call }: gRPCServerStreamingCall<GetCampaignActionsRequest, GetCampaignActionsReply>,
    { db }: IContext,
  ) {
    const campaignId = call.request.getCampaignId();

    const result = await db.campaignAction.getByCampaignId({
      campaignId,
    });

    for (const action of result) {
      const reply = new GetCampaignActionsReply();

      reply.setCampaignId(action.campaignId);
      reply.setInitialInstruction(action.initialInstruction);
      reply.setReply(action.reply);
      reply.setIntentAction(action.intentAction);

      call.write(reply, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    call.end();
  }
}
