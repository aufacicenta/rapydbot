import { IntentAction } from "../providers/cohere/types";
import { IntentActionEntity } from "../providers/dialogflow/types";

export const intentActionsMap = {
  [IntentAction.WalletCreate]: {
    name: IntentAction.WalletCreate,
    description: "Create a new wallet",
    entities: [IntentActionEntity.CurrencyCode],
  },
};
