import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

const makePolygonString = (points: mapboxgl.LngLat[]) => points.map((point) => `${point.lng} ${point.lat}`).join(",");

const mapbox = { makePolygonString, lib: mapboxgl };

export default mapbox;
