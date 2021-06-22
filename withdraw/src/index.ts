import grpc from "grpc";
import database from "./database";
import { WithdrawDAO } from "./database/dao/WithdrawDAO";
import configuration from "./server/config";
import context from "./server/context";
import create from "./server/create";

(async () => {
  const driver = await database.connect();
  context.database = driver;
  context.dao.WithdrawDAO = new WithdrawDAO(driver);

  const { address, port } = configuration.get("server");

  const gRPCServer = create(context);

  const URL = `${address}:${port}`;

  gRPCServer.bind(URL, grpc.ServerCredentials.createInsecure());

  console.log(`Starting gRPC server on: ${URL}`);

  gRPCServer.start();
})();
