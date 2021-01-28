import grpc from "grpc";
import configuration from "./server/config";
import context from "./server/context";
import create from "./server/create";

const { address, port } = configuration.get("server");

const gRPCServer = create(context);

const URL = `${address}:${port}`;

gRPCServer.bind(URL, grpc.ServerCredentials.createInsecure());

console.log(`Starting gRPC server on: ${URL}`);

gRPCServer.start();
