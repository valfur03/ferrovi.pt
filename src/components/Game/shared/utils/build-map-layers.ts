import { Feature, FeatureCollection, LineString, Point } from "geojson";
import { metroGraph } from "@/data/metro-stations";
import { MetroStation } from "@/types/metro-station";

// TODO move out feature building
export const buildMapLayers = (
    discoveredStations: Array<MetroStation & { rightGuess: boolean }>,
    endpoints: [MetroStation, MetroStation],
) => {
    return discoveredStations.reduce<{
        metroStationsGeoJson: FeatureCollection<Point>;
        rightPathsGeoJson: FeatureCollection<LineString>;
        wrongPathsGeoJson: FeatureCollection<LineString>;
    }>(
        ({ metroStationsGeoJson, rightPathsGeoJson, wrongPathsGeoJson }, { id, rightGuess, coordinates }) => {
            const siblings = metroGraph.get(id);

            if (siblings === undefined) {
                throw new Error("node is not supposed to be omitted");
            }

            const [newRightPaths, newWrongPaths] = Array.from(siblings).reduce<
                [Array<Feature<LineString>>, Array<Feature<LineString>>]
            >(
                ([newRightPaths, newWrongPaths], [, siblingMetroStation]) => {
                    const siblingMetroStationWithSolution = discoveredStations.find(
                        ({ id }) => id === siblingMetroStation.id,
                    );

                    if (siblingMetroStationWithSolution === undefined) {
                        return [newRightPaths, newWrongPaths];
                    }

                    if (rightGuess && siblingMetroStationWithSolution.rightGuess) {
                        return [
                            [
                                ...newRightPaths,
                                {
                                    type: "Feature",
                                    properties: {},
                                    geometry: {
                                        type: "LineString",
                                        coordinates: [coordinates, siblingMetroStation.coordinates],
                                    },
                                },
                            ],
                            newWrongPaths,
                        ];
                    } else {
                        return [
                            newRightPaths,
                            [
                                ...newWrongPaths,
                                {
                                    type: "Feature",
                                    properties: {},
                                    geometry: {
                                        type: "LineString",
                                        coordinates: [coordinates, siblingMetroStation.coordinates],
                                    },
                                },
                            ],
                        ];
                    }
                },
                [[], []],
            );

            const newMetroStation: Array<Feature<Point>> =
                id !== endpoints[0].id && id !== endpoints[1].id
                    ? [{ type: "Feature", properties: {}, geometry: { type: "Point", coordinates } }]
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
    );
};
