import { MutationResult, QueryResult } from "@apollo/client";
import {
  SetCampaignBoundsInput,
  SetCampaignBoundsMutation,
  GetUsersByLocationBoundsQuery,
  GetUsersByLocationBoundsQueryVariables,
} from "api/codegen";
import { LngLat } from "mapbox-gl";
import { ReactNode } from "react";

export type PolygonBoundsProps = {
  onSaveBounds: (bounds: SetCampaignBoundsInput["bounds"]) => Promise<void>;
  onSaveBoundsState: MutationResult<SetCampaignBoundsMutation>;
  informersCoordinates: LngLat[];
  getUsersByLocationBoundsState: QueryResult<GetUsersByLocationBoundsQuery, GetUsersByLocationBoundsQueryVariables>;
  children?: ReactNode;
  className?: string;
};
