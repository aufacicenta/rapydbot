import grpc from "grpc";
import database from "./database";
import { WalletDAO } from "./database/dao/WalletDAO";
import context from "./server/context";
import create from "./server/create";

(async () => {
  const driver = await database.connect();
  context.database = driver;
  context.dao.WalletDAO = new WalletDAO(driver);

  const gRPCServer = create(context);

  const URL = `${process.env.IP_ADDRESS}:${process.env.HTTP_PORT}`;

  gRPCServer.bind(URL, grpc.ServerCredentials.createInsecure());

  console.log(`Starting gRPC server on: ${URL}`);

  gRPCServer.start();
})();
