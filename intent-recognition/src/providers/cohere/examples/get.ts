import es_wallet_create from "./es/wallet/create.json";

export const getExamplesByLanguageCode = (code: string) => {
  switch (code) {
    case "es": {
      return {
        ...es_wallet_create,
      };
    }

    default: {
      return {
        ...es_wallet_create,
      };
    }
  }
};
