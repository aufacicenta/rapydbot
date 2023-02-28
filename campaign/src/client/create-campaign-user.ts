import { CampaignClient, CreateCampaignUserReply, CreateCampaignUserRequest } from ".";

export const createCampaignUser = (
  client: CampaignClient,
  { campaignId, userId, messageId }: CreateCampaignUserRequest.AsObject,
): Promise<CreateCampaignUserReply.AsObject> => {
  const request = new CreateCampaignUserRequest();

  request.setCampaignId(campaignId);
  request.setUserId(userId);
  request.setMessageId(messageId);

  return new Promise((resolve) => {
    client.createCampaignUser(request, (error, reply) => {
      if (error) {
        throw error;
      }

      resolve({
        campaignId: reply.getCampaignId(),
        userId: reply.getUserId(),
        messageId: reply.getMessageId(),
      });
    });
  });
};
