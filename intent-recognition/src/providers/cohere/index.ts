import { getHighestConfidenceIntent } from "./classify/labels";
import client from "./client";
import { getExamplesByLanguageCode } from "./examples/get";

export default {
  client,
  examples: { getExamplesByLanguageCode },
  classify: { getHighestConfidenceIntent },
};
