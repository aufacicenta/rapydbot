import * as grpc from "@grpc/grpc-js";

import database from "./database";
import { Campaign } from "./database/campaign";
import { CampaignAction } from "./database/campaign-action";
import { CampaignUser } from "./database/campaign-user";
import server from "./server";
import { IContext } from "./server/interface/IContext";
import { Controller } from "./service/controller";

const run = async () => {
  const driver = await database.connect();

  const context: IContext = {
    controller: new Controller(),
    db: {
      driver,
      campaign: new Campaign(driver),
      campaignActions: new CampaignAction(driver),
      campaignUser: new CampaignUser(driver),
    },
  };

  const gRPCServer = server.create(context);

  const URL = `${process.env.IP_ADDRESS}:${process.env.HTTP_PORT}`;

  gRPCServer.bindAsync(
    URL,
    grpc.ServerCredentials.createInsecure(),
    (err: Error | null, port: number) => {
      if (err) {
        console.error(`Server error: ${err.message}`);
      } else {
        console.log(`Starting gRPC server on: ${port}`);

        gRPCServer.start();
      }
    },
  );
};

run();
