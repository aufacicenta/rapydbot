import grpc from "grpc";
import database from "./database";
import { TelegramPassportDAO } from "./database/dao/TelegramPassportDAO";
import configuration from "./server/config";
import context from "./server/context";
import create from "./server/create";

(async () => {
  const driver = await database.connect();
  context.database = driver;
  context.dao.TelegramPassportDAO = new TelegramPassportDAO(driver);

  const { address, port } = configuration.get("server");

  const gRPCServer = create(context);

  const URL = `${address}:${port}`;

  gRPCServer.bind(URL, grpc.ServerCredentials.createInsecure());

  console.log(`Starting gRPC server on: ${URL}`);

  gRPCServer.start();
})();
