import { cohereResponse, classifyResponse } from "cohere-ai/dist/models";

import { IntentAction } from "../types";

export const getHighestConfidenceIntent = (response: cohereResponse<classifyResponse>) =>
  response.body.classifications[0].prediction as IntentAction;
