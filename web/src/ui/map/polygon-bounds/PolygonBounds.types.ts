import { LngLat } from "mapbox-gl";
import { ReactNode } from "react";

export type PolygonBoundsProps = {
  informersCoordinates: LngLat[];
  children?: ReactNode;
  className?: string;
};
