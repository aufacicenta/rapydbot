import getRandomUsername from "@rapydbot/wallet/__test__/util/getRandomUsername";

import { CampaignClientGenerator, CampaignClient } from "../../client";
import { createCampaign } from "../../client/create-campaign";
import { createCampaignAction } from "../../client/create-campaign-action";
import { createCampaignUser } from "../../client/create-campaign-user";
import { instructions } from "../util/instructions";

let client: CampaignClient;

const { IP_ADDRESS: address, HTTP_PORT: port } = process.env;

describe("client", () => {
  const [issuerId, user1, user2] = [
    getRandomUsername(),
    getRandomUsername(),
    getRandomUsername(),
  ];

  beforeAll(async () => {
    client = new CampaignClientGenerator(`${address}:${port}`).create();
  });

  test("success: createCampaign", async () => {
    const campaignId = await createCampaign(client, { issuerId });

    expect(campaignId).toBeDefined();
  });

  test("success: create campaign actions", async () => {
    const campaignId = await createCampaign(client, { issuerId });

    for (const key in instructions) {
      const initialInstruction = instructions[key].initialInstruction;
      const reply = instructions[key].reply;

      const campaignActionId = await createCampaignAction(client, {
        campaignId,
        initialInstruction,
        reply,
        intentAction: key,
      });

      expect(campaignActionId).toBeDefined();
    }
  });

  test("success: create campaign user", async () => {
    const campaignId = await createCampaign(client, { issuerId });
    const messageId = getRandomUsername();

    const {
      campaignId: linkedCampaignId,
      userId,
      messageId: linkedMessageId,
    } = await createCampaignUser(client, {
      campaignId,
      userId: user1,
      messageId,
    });

    expect(campaignId).toEqual(linkedCampaignId);
    expect(userId).toEqual(user1);
    expect(messageId).toEqual(linkedMessageId);
  });
});
