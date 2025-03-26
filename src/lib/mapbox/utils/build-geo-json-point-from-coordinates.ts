import { Feature, Point } from "geojson";

export const buildGeoJsonPointFromCoordinates = (coordinates: [number, number]): Feature<Point, null> => ({
    type: "Feature",
    properties: {},
    geometry: {
        type: "Point",
        coordinates,
    },
});
