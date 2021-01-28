export * from "../server/protos/schema_grpc_pb";
export * from "../server/protos/schema_pb";

import grpc from "grpc";
import configuration from "../server/config";
import { KYCClient } from "../server/protos/schema_grpc_pb";

const { address, port } = configuration.get("server");

const URL = `${address}:${port}`;

export const client = new KYCClient(
  URL,
  grpc.credentials.createInsecure()
) as KYCClient;

export default client;
