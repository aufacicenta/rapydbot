import grpc from "grpc";
import database from "./database";
import { Wallet } from "./database/wallet";
import server from "./server";
import { IContext } from "./server/interface/IContext";
import container from "./service/container";
import { Controller } from "./service/controller";

(async () => {
  const driver = await database.connect();

  const context: IContext = {
    controller: container.get<Controller>(Controller.type),
    db: {
      driver,
      wallet: new Wallet(driver),
    },
  };

  const gRPCServer = server.create(context);

  const URL = `${process.env.IP_ADDRESS}:${process.env.HTTP_PORT}`;

  gRPCServer.bind(URL, grpc.ServerCredentials.createInsecure());

  console.log(`Starting gRPC server on: ${URL}`);

  gRPCServer.start();
})();
