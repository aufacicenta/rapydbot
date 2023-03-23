import * as grpc from "@grpc/grpc-js";

import { IContext } from "../server/interface/IContext";
import {
  CreateCampaignActionMessageReply,
  CreateCampaignActionMessageRequest,
  CreateCampaignActionReply,
  CreateCampaignActionRequest,
  CreateCampaignReply,
  CreateCampaignRequest,
  GetCampaignActionMessagesByUserIdRequest,
  GetCampaignActionMessagesReply,
  GetCampaignActionMessagesRequest,
  GetCampaignActionsReply,
  GetCampaignActionsRequest,
  SetCampaignBoundsReply,
  SetCampaignBoundsRequest,
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

  async setCampaignBounds(
    { call, callback }: GRPCUnaryCall<SetCampaignBoundsRequest, SetCampaignBoundsReply>,
    { db }: IContext,
  ) {
    try {
      const campaignId = call.request.getCampaignId();
      const bounds = call.request.getBounds();
      const issuerId = call.request.getIssuerId();

      // @TODO Verify that the issuer is the owner of the campaign at setCampaignBounds

      await db.campaign.setBounds({
        campaignId,
        bounds,
        issuerId,
      });

      const reply = new SetCampaignBoundsReply();

      reply.setCampaignId(campaignId);
      reply.setBounds(bounds);

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

    try {
      const result = await db.campaignAction.getByCampaignId({
        campaignId,
      });

      for (const action of result) {
        const reply = new GetCampaignActionsReply();

        reply.setId(action.id);
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
    } catch (error) {
      call.destroy(error as Error);
    }
  }

  async getCampaignActionMessages(
    {
      call,
    }: gRPCServerStreamingCall<GetCampaignActionMessagesRequest, GetCampaignActionMessagesReply>,
    { db }: IContext,
  ) {
    const campaign_action_id = call.request.getCampaignActionId();

    const result = await db.campaignActionMessage.getByCampaignActionId({
      campaign_action_id,
    });

    for (const action of result) {
      const reply = new GetCampaignActionMessagesReply();

      reply.setId(action.id);
      reply.setCampaignActionId(action.campaignActionId);
      reply.setUserId(action.userId);
      reply.setMessage(action.message);
      // @TODO return approvedBy
      reply.setApprovedAt(action.approvedAt);

      call.write(reply, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    call.end();
  }

  async getCampaignActionMessagesByUserId(
    {
      call,
    }: gRPCServerStreamingCall<
      GetCampaignActionMessagesByUserIdRequest,
      GetCampaignActionMessagesReply
    >,
    { db }: IContext,
  ) {
    const campaign_action_id = call.request.getCampaignActionId();
    const user_id = call.request.getUserId();

    const result = await db.campaignActionMessage.getByCampaignActionIdAndUserId({
      campaign_action_id,
      user_id,
    });

    for (const action of result) {
      const reply = new GetCampaignActionMessagesReply();

      reply.setId(action.id);
      reply.setCampaignActionId(action.campaignActionId);
      reply.setUserId(action.userId);
      reply.setMessage(action.message);
      // @TODO return approvedBy
      reply.setApprovedAt(action.approvedAt);

      call.write(reply, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    call.end();
  }
}
