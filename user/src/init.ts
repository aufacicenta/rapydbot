import * as grpc from "@grpc/grpc-js";

import database from "./database";
import { Location } from "./database/location";
import { Telegram } from "./database/telegram";
import { User } from "./database/user";
import server from "./server";
import { IContext } from "./server/interface/IContext";
import { Controller } from "./service/controller";

const run = async () => {
  const driver = await database.connect({ force: true });

  const context: IContext = {
    controller: new Controller(),
    db: {
      driver,
      user: new User(driver),
      telegram: new Telegram(driver),
      location: new Location(driver),
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
