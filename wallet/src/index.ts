import * as grpc from "@grpc/grpc-js";
import database from "./database";
import { Wallet } from "./database/wallet";
import server from "./server";
import { IContext } from "./server/interface/IContext";
import { Controller } from "./service/controller";

(async () => {
  const driver = await database.connect();

  const context: IContext = {
    controller: new Controller(),
    db: {
      driver,
      wallet: new Wallet(driver),
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
    }
  );
})();
