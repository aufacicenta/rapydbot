import cohere from "cohere-ai";

import { getHighestConfidenceIntent } from "./classify/labels";
import { getExamplesByLanguageCode } from "./examples/get";

cohere.init(process.env.COHERE_API_KEY!);

export default {
  client: cohere,
  examples: { getExamplesByLanguageCode },
  classify: { getHighestConfidenceIntent },
};
