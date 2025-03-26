import { Feature, Point } from "geojson";

export const buildGeoJsonPointFromCoordinates = (coordinates: [number, number]): Feature<Point, null> => ({
    type: "Feature",
    properties: null,
    geometry: {
        type: "Point",
        coordinates,
    },
});
