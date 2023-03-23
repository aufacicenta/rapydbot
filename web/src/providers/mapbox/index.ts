import mapboxgl, { LngLat } from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

const makePolygonString = (points: mapboxgl.LngLat[]) => {
  if (!points.length) {
    return "";
  }

  points.push(points[0]);

  return points.map((point) => `${point.lng} ${point.lat}`).join(",");
};

const makeCoordinates = (points: LngLat[]) => points.map((point) => [point.lng, point.lat]);

const makePoints = (points: LngLat[]) =>
  points.map((point) => ({
    type: "Feature" as "Feature",
    properties: {
      icon: "circle",
    },
    geometry: {
      type: "Point" as "Point",
      coordinates: [point.lng, point.lat],
    },
  }));

const makeFeatures = (_points: LngLat[]) => {
  const coordinates = makeCoordinates(_points);
  const points = makePoints(_points);

  return [
    {
      type: "Feature" as "Feature",
      properties: {},
      geometry: {
        type: "Polygon" as "Polygon",
        coordinates: [[...coordinates]],
      },
    },
    ...points,
  ];
};

const mapbox = { makePolygonString, makeCoordinates, makeFeatures, makePoints, lib: mapboxgl };

export default mapbox;
