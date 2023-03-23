import {
  CampaignClient,
  GetCampaignActionMessagesByUserIdRequest,
  GetCampaignActionMessagesReply,
} from ".";

export const getCampaignActionMessagesByUserId = (
  client: CampaignClient,
  { campaignActionId, userId }: GetCampaignActionMessagesByUserIdRequest.AsObject,
): Promise<Array<GetCampaignActionMessagesReply.AsObject>> => {
  const request = new GetCampaignActionMessagesByUserIdRequest();

  request.setCampaignActionId(campaignActionId);
  request.setUserId(userId);

  return new Promise((resolve) => {
    const call = client.getCampaignActionMessagesByUserId(request);

    const response: Array<GetCampaignActionMessagesReply.AsObject> = [];

    call.on("data", (data: GetCampaignActionMessagesReply) => {
      response.push(data.toObject());
    });

    call.on("end", () => {
      resolve(response);
    });
  });
};
