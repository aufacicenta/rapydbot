import grpc from "grpc";
import { injectable } from "inversify";
import "reflect-metadata";
import { IGreeterServer } from "../server/protos/schema_grpc_pb";
import { HelloReply, HelloRequest } from "../server/protos/schema_pb";

@injectable()
export class Handler implements IGreeterServer {
  public static type: string = "Handler";

  chargeUserCard(
    call: grpc.ServerUnaryCall<HelloRequest>,
    callback: grpc.sendUnaryData<HelloReply>
  ) {
    const reply = new HelloReply();

    reply.setMessage(`Hello: ${call.request.getName()}`);

    callback(null, reply);
  }
}
