import grpc from "grpc";
import configuration from "../server/config";
import { GreeterClient } from "../server/protos/schema_grpc_pb";

const { address, port } = configuration.get("server");

const URL = `${address}:${port}`;

export const client = new GreeterClient(URL, grpc.credentials.createInsecure());
export default client;

// const request = new HelloRequest();

// request.setName("Godoberto");

// client.sayHello(request, (err, response) => {
//   if (Boolean(err)) {
//     console.log(err);
//     return;
//   }

//   console.log(`Greetings: ${response.getMessage()}`);
// });
