import grpc from "grpc";
import { injectable } from "inversify";
import "reflect-metadata";
import { IGreeterServer } from "../server/protos/schema_grpc_pb";
import { HelloReply, HelloRequest } from "../server/protos/schema_pb";

@injectable()
export class Controller implements IGreeterServer {
  public static type: string = "Controller";

  sayHello(
    call: grpc.ServerUnaryCall<HelloRequest>,
    callback: grpc.sendUnaryData<HelloReply>
  ) {
    const reply = new HelloReply();

    reply.setMessage(`Hello: ${call.request.getName()}`);
    console.log(`Replying: ${call.request.getName()}`);

    callback(null, reply);
  }
}
