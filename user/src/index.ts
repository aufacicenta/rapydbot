import fs from "fs";
import grpc from "grpc";
import database from "./database";
import { UserDAO } from "./database/dao/UserDAO";
import configuration from "./server/config";
import context from "./server/context";
import create from "./server/create";

(async () => {
  const driver = await database.connect();
  context.database = driver;
  context.dao.UserDAO = new UserDAO(driver);

  const { address, port } = configuration.get("server");

  const gRPCServer = create(context);

  const URL = `${address}:${port}`;

  const credentials = grpc.ServerCredentials.createSsl(
    fs.readFileSync(`${process.env.SSL_CERTIFICATES_PATH}/ca.crt`),
    [
      {
        cert_chain: fs.readFileSync(`${process.env.SSL_CERTIFICATES_PATH}/server.crt`),
        private_key: fs.readFileSync(`${process.env.SSL_CERTIFICATES_PATH}/server.key`),
      },
    ],
    true
  );

  gRPCServer.bind(URL, credentials);

  console.log(`Starting gRPC server on: ${URL}`);

  gRPCServer.start();
})();
