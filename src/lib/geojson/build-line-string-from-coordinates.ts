import { Feature, GeoJsonProperties, LineString } from "geojson";

export const buildLineStringFromCoordinates = <P extends GeoJsonProperties>(
    coordinates: Array<[number, number]>,
    properties: P,
): Feature<LineString, P> => ({
    type: "Feature",
    properties,
    geometry: {
        type: "LineString",
        coordinates,
    },
});
