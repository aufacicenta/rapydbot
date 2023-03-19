import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { loadTypedefsSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { NextApiRequest } from "next";
import path from "node:path";
import jwt, { JwtPayload } from "jsonwebtoken";
import { DocumentNode } from "graphql";
import { Resolvers } from "api/codegen/resolvers-types";
import { CampaignClient, CampaignClientGenerator } from "@rapydbot/campaign";
import { UserClient, UserClientGenerator, getUser } from "@rapydbot/user";

import { createCampaignActionResolver as createCampaignAction } from "./campaign/resolver/create-campaign-action";
import { setCampaignBoundsResolver as setCampaignBounds } from "./campaign/resolver/set-campaign-bounds";
import { getCampaignActionsResolver as getCampaignActions } from "./campaign/resolver/get-campaign-actions";
import { getUsersCoordinatesResolver as getUsersCoordinates } from "./user/resolver/get-users-coordinates";

const { CAMPAIGN_SERVICE_URL, USER_SERVICE_URL } = process.env;

const schemas = loadTypedefsSync(
  [
    path.join(process.cwd(), "/src/pages/api/campaign/schema.graphql"),
    path.join(process.cwd(), "/src/pages/api/user/schema.graphql"),
  ],
  {
    loaders: [new GraphQLFileLoader()],
  },
);

const typeDefs = schemas.map((schema) => schema.document) as DocumentNode[];

const resolvers: Resolvers = {
  Query: {
    getCampaignActions,
    getUsersCoordinates,
  },
  Mutation: {
    createCampaignAction,
    setCampaignBounds,
  },
};

export type ResolversContext = {
  req: NextApiRequest;
  clients: {
    campaign: CampaignClient;
    user: UserClient;
  };
  auth?: {
    userId?: string;
  };
};

const apolloServer = new ApolloServer<ResolversContext>({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler<ResolversContext>(apolloServer, {
  context: async (req) => {
    const context: ResolversContext = {
      req,
      clients: {
        campaign: new CampaignClientGenerator(CAMPAIGN_SERVICE_URL!).create(),
        user: new UserClientGenerator(USER_SERVICE_URL!).create(),
      },
    };

    if (!req.headers.authorization) {
      throw new Error("No authorization header");
    }

    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!payload.userId) {
      throw new Error("No userId in payload");
    }

    const { userId } = await getUser(context.clients.user, { userId: payload.userId });

    context.auth = { userId };

    return context;
  },
});
