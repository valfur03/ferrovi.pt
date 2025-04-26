import { Feature, GeoJsonProperties, Point } from "geojson";

export const buildPointFromCoordinates = <P extends GeoJsonProperties>(
    coordinates: [number, number],
    properties: P,
): Feature<Point, P> => ({
    type: "Feature",
    properties,
    geometry: {
        type: "Point",
        coordinates,
    },
});
