import { Feature, FeatureCollection, GeoJsonProperties, LineString, Point } from "geojson";
import { metroGraph } from "@/data/metro-stations";
import { PathGameType } from "@/contexts/path-game/path-game.type";
import { buildPointFromCoordinates } from "@/lib/geojson/build-point-from-coordinates";
import { buildLineStringFromCoordinates } from "@/lib/geojson/build-line-string-from-coordinates";

export const buildMapLayers = ({
    discoveredStations,
    endpoints,
}: Pick<PathGameType["current"], "discoveredStations" | "endpoints">) => {
    return {
        endpointsGeoJson: {
            from: buildPointFromCoordinates(endpoints.from.coordinates, {}),
            to: buildPointFromCoordinates(endpoints.to.coordinates, {}),
        },
        ...discoveredStations.reduce<{
            metroStationsGeoJson: FeatureCollection<Point, GeoJsonProperties & { label: string }>;
            rightPathsGeoJson: FeatureCollection<LineString>;
            wrongPathsGeoJson: FeatureCollection<LineString>;
        }>(
            (
                { metroStationsGeoJson, rightPathsGeoJson, wrongPathsGeoJson },
                { id, onShortestPath, coordinates, name },
            ) => {
                const siblings = metroGraph.get(id);

                if (siblings === undefined) {
                    throw new Error("node is not supposed to be omitted");
                }

                const [newRightPaths, newWrongPaths] = Array.from(siblings).reduce<
                    [Array<Feature<LineString>>, Array<Feature<LineString>>]
                >(
                    ([newRightPaths, newWrongPaths], [, siblingMetroStation]) => {
                        const siblingMetroStationWithSolution = [
                            { ...endpoints.from, onShortestPath: true },
                            { ...endpoints.to, onShortestPath: true },
                            ...discoveredStations,
                        ].find(({ id }) => id === siblingMetroStation.id);

                        if (siblingMetroStationWithSolution === undefined) {
                            return [newRightPaths, newWrongPaths];
                        }

                        if (onShortestPath && siblingMetroStationWithSolution.onShortestPath) {
                            return [
                                [
                                    ...newRightPaths,
                                    buildLineStringFromCoordinates([coordinates, siblingMetroStation.coordinates], {}),
                                ],
                                newWrongPaths,
                            ];
                        } else {
                            return [
                                newRightPaths,
                                [
                                    ...newWrongPaths,
                                    buildLineStringFromCoordinates([coordinates, siblingMetroStation.coordinates], {}),
                                ],
                            ];
                        }
                    },
                    [[], []],
                );

                const newMetroStation: Array<Feature<Point, GeoJsonProperties & { label: string }>> =
                    id !== endpoints.from.id && id !== endpoints.to.id
                        ? [buildPointFromCoordinates(coordinates, { label: name })]
                        : [];

                return {
                    metroStationsGeoJson: {
                        ...metroStationsGeoJson,
                        features: [...metroStationsGeoJson.features, ...newMetroStation],
                    },
                    rightPathsGeoJson: {
                        ...rightPathsGeoJson,
                        features: [...rightPathsGeoJson.features, ...newRightPaths],
                    },
                    wrongPathsGeoJson: {
                        ...wrongPathsGeoJson,
                        features: [...wrongPathsGeoJson.features, ...newWrongPaths],
                    },
                };
            },
            {
                metroStationsGeoJson: { type: "FeatureCollection", features: [] },
                rightPathsGeoJson: { type: "FeatureCollection", features: [] },
                wrongPathsGeoJson: { type: "FeatureCollection", features: [] },
            },
        ),
    };
};
