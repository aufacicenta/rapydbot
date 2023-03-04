type RouteMap = {
  home: () => string;
  market: {
    price: (args: { marketId: string }) => string;
  };
  dashboard: {
    latestTrends: () => string;
    market: (args: { marketId: string }) => string;
    sports: (pageSlug: string) => string;
    bets: (pageSlug: string) => string;
    profile: (pageSlug: string) => string;
  };
};

export const routes: RouteMap = {
  home: () => `/`,
  market: {
    price: ({ marketId }) => `/market/price/${marketId}`,
  },
  dashboard: {
    latestTrends: () => `/`,
    market: ({ marketId }) => `/market/${marketId}`,
    sports: () => `/sports`,
    bets: () => `/bets`,
    profile: () => `/profile`,
  },
};

export const useRoutes: () => RouteMap = () => routes;
