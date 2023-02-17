import { cohereResponse, classifyResponse } from "cohere-ai/dist/models";

export const getHighestConfidenceIntent = (response: cohereResponse<classifyResponse>) => {
  return response.body.classifications[0].prediction;
};
