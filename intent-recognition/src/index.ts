import * as grpc from "@grpc/grpc-js";

import server from "./server";
import { IContext } from "./server/interface/IContext";
import { Controller } from "./service/controller";

(async () => {
  const context: IContext = {
    controller: new Controller(),
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
})();
