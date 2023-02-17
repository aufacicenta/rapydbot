import * as grpc from "@grpc/grpc-js";
import { classifyBaseRequest } from "cohere-ai/dist/models";
import cohere from "../providers/cohere";

import { IContext } from "../server/interface/IContext";
import { ClassifyRequest, ClassifyReply } from "../server/protos/schema_pb";

type gRPCServerUnaryCall<Request, Reply> = {
  call: grpc.ServerUnaryCall<Request, Reply>;
  callback: grpc.sendUnaryData<Reply>;
};

export class Controller {
  public static type: string = "Controller";

  async classify(
    { call, callback }: gRPCServerUnaryCall<ClassifyRequest, ClassifyReply>,
    {}: IContext,
  ) {
    try {
      const input = call.request.getInput();

      const {
        body: { results },
      } = await cohere.client.detectLanguage({ texts: [input] });

      const [language] = results;

      const examples = cohere.examples.getExamplesByLanguageCode(language.language_code);

      const response = await cohere.client.classify({
        model: "60a0705a-5231-4d4a-b62f-8be55def74a5-ft",
        inputs: [input],
      });

      const prediction = cohere.classify.getHighestConfidenceIntent(response);

      const reply = new ClassifyReply();

      reply.setAction(prediction);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }
}
