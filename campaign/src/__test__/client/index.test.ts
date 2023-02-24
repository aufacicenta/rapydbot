import getRandomUsername from "@rapydbot/wallet/__test__/util/getRandomUsername";

import { CampaignClientGenerator, CampaignClient } from "../../client";
import { createCampaign } from "../../client/create-campaign";
import { createCampaignAction } from "../../client/create-campaign-action";
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
    const campaignId = await createCampaign(client, { issuerId, messageId: getRandomUsername() });

    expect(campaignId).toBeDefined();
  });

  test("success: create campaign actions", async () => {
    const campaignId = await createCampaign(client, { issuerId, messageId: getRandomUsername() });

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
});
