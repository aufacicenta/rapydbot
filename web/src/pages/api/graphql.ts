import { ApolloServer } from "apollo-server-micro";
import { loadTypedefsSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { NextApiRequest, NextApiResponse } from "next";
import path from "node:path";
import { DocumentNode } from "graphql";
import { Resolvers } from "api/codegen/resolvers-types";
import { CampaignClient, CampaignClientGenerator } from "@rapydbot/campaign";

import { routes } from "hooks/useRoutes/useRoutes";

import { createCampaignActionResolver as createCampaignAction } from "./campaign/resolver/create-campaign-action";

const { CAMPAIGN_SERVICE_URL } = process.env;

const schemas = loadTypedefsSync([path.join(process.cwd(), "/src/pages/api/campaign/schema.graphql")], {
  loaders: [new GraphQLFileLoader()],
});

const typeDefs = schemas.map((schema) => schema.document) as DocumentNode[];

const resolvers: Resolvers = {
  Query: {},
  Mutation: {
    createCampaignAction,
  },
};

export type ResolversContext = {
  req: NextApiRequest;
  clients: {
    campaign: CampaignClient;
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const context: ResolversContext = {
    req,
    clients: { campaign: new CampaignClientGenerator(CAMPAIGN_SERVICE_URL!).create() },
  };

  const apolloServer = new ApolloServer({ typeDefs, resolvers, context });

  const startServer = apolloServer.start();

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "https://studio.apollographql.com");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.end();

    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: routes.api.graphql(),
  })(req, res);

  return null;
}

export const config = {
  api: {
    bodyParser: false,
  },
};
