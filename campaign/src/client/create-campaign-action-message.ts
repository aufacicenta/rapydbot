import {
  CampaignClient,
  CreateCampaignActionMessageReply,
  CreateCampaignActionMessageRequest,
} from ".";

export const createCampaignActionMessage = (
  client: CampaignClient,
  { campaignActionId, userId, message }: CreateCampaignActionMessageRequest.AsObject,
): Promise<CreateCampaignActionMessageReply.AsObject["id"]> => {
  const request = new CreateCampaignActionMessageRequest();

  request.setCampaignActionId(campaignActionId);
  request.setUserId(userId);
  request.setMessage(message);

  return new Promise((resolve) => {
    client.createCampaignActionMessage(request, (error, reply) => {
      if (error) {
        throw error;
      }

      resolve(reply.getId());
    });
  });
};
