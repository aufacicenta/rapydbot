import * as grpc from "@grpc/grpc-js";

import cohere from "../providers/cohere";
import openai from "../providers/openai";
import { IContext } from "../server/interface/IContext";
import { ClassifyRequest, ClassifyReply } from "../server/protos/schema_pb";

import { IntentRecognitionServiceErrorCodes } from "./error";

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

      // @TODO set this in env
      const engines = ["openai"];
      let prediction: string;

      if (engines.includes("cohere")) {
        const response = await cohere.client.classify({
          model: "60a0705a-5231-4d4a-b62f-8be55def74a5-ft",
          inputs: [input],
        });

        if (response.statusCode !== 200) {
          throw new Error(IntentRecognitionServiceErrorCodes.classify_invalid_response);
        }

        prediction = cohere.classify.getHighestConfidenceIntent(response);
      } else {
        const response = await openai.client.createCompletion({
          model: "ada:ft-aufacicenta-2023-02-21-22-08-39",
          prompt: `${input}::END::`,
          temperature: 0,
          max_tokens: 3,
        });

        if (response.status !== 200) {
          throw new Error(IntentRecognitionServiceErrorCodes.classify_invalid_response);
        }

        prediction = response.data.choices[0].text.trim();
      }

      const reply = new ClassifyReply();

      reply.setAction(prediction);

      callback(null, reply);
    } catch (error) {
      // @TODO return error code with the reason of failure to be handled by the client
      callback(error, null);
    }
  }
}
