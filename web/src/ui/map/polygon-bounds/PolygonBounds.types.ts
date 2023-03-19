import { SetCampaignBoundsInput } from "api/codegen";
import { LngLat } from "mapbox-gl";
import { ReactNode } from "react";

export type PolygonBoundsProps = {
  onSaveBounds: (bounds: SetCampaignBoundsInput["bounds"]) => Promise<void>;
  informersCoordinates: LngLat[];
  children?: ReactNode;
  className?: string;
};
