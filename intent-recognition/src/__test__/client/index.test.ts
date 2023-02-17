import {
  IntentRecognitionClientGenerator,
  ClassifyRequest,
  ClassifyReply,
  IntentRecognitionClient,
} from "../../client";

let client: IntentRecognitionClient;

describe("controller", () => {
  beforeAll(async () => {
    client = new IntentRecognitionClientGenerator(
      `${process.env.IP_ADDRESS}:${process.env.HTTP_PORT}`,
    ).create();
  });

  test("success: call cohere classify API", async () => {
    const request = new ClassifyRequest();

    const input = "Envía 100 a juan";

    const classify = (): Promise<ClassifyReply.AsObject["action"]> =>
      new Promise((resolve) => {
        request.setInput(input);

        client.classify(request, (error, reply) => {
          if (error) {
            throw error;
          }

          resolve(reply.getAction());
        });
      });

    const action = await classify();

    expect(action).toBe("send");
  });
});
