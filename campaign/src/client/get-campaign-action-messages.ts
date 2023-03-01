import {
  CampaignClient,
  GetCampaignActionMessagesReply,
  GetCampaignActionMessagesRequest,
} from ".";

export const getCampaignActionMessages = (
  client: CampaignClient,
  { campaignActionId }: GetCampaignActionMessagesRequest.AsObject,
): Promise<Array<GetCampaignActionMessagesReply.AsObject>> => {
  const request = new GetCampaignActionMessagesRequest();

  request.setCampaignActionId(campaignActionId);

  return new Promise((resolve) => {
    const call = client.getCampaignActionMessages(request);

    const response: Array<GetCampaignActionMessagesReply.AsObject> = [];

    call.on("data", (data: GetCampaignActionMessagesReply) => {
      response.push(data.toObject());
    });

    call.on("end", () => {
      resolve(response);
    });
  });
};
