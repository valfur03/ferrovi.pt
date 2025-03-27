"use client";

import * as React from "react";
import Map, { Layer, Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Feature, FeatureCollection, LineString, Point } from "geojson";
import { useGame } from "@/contexts/game/use-game";
import { metroGraph } from "@/data/metro-stations";
import { buildGeoJsonPointFromCoordinates } from "@/lib/mapbox/utils/build-geo-json-point-from-coordinates";

export type MapboxMetroStationsProps = {
    accessToken: string;
};

export const MapboxMetroStations = ({ accessToken }: MapboxMetroStationsProps) => {
    const { discoveredStations, endpoints } = useGame();

    if (discoveredStations === null || endpoints === null) {
        return null;
    }

    const { metroStationsGeoJson, rightPathsGeoJson, wrongPathsGeoJson } = discoveredStations.reduce<{
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

    return (
        <Map
            mapboxAccessToken={accessToken}
            mapStyle="mapbox://styles/hintauh/cm8oi8gph004801sk72xbgo2a"
            initialViewState={{
                longitude: 2.332,
                latitude: 48.86,
                zoom: 10.2,
            }}
            minZoom={10.5}
            maxZoom={16}
            maxBounds={[
                [2.23, 48.7],
                [2.5, 48.99],
            ]}
            projection="globe"
            reuseMaps
        >
            <Source type="geojson" data={wrongPathsGeoJson}>
                <Layer
                    type="line"
                    paint={{
                        "line-dasharray": [1, 3, 1],
                        "line-width": 2,
                        "line-color": "#818181",
                    }}
                />
            </Source>
            <Source type="geojson" data={rightPathsGeoJson}>
                <Layer
                    type="line"
                    paint={{
                        "line-width": 4,
                        "line-color": "#283343",
                    }}
                />
            </Source>
            <Source type="geojson" data={metroStationsGeoJson}>
                <Layer
                    type="circle"
                    paint={{
                        "circle-radius": {
                            type: "exponential",
                            base: 1.6,
                            stops: [
                                [9, 2.5],
                                [22, 250],
                            ],
                        },
                        "circle-color": "#fffaf4",
                        "circle-stroke-color": "#464646",
                        "circle-stroke-width": {
                            type: "exponential",
                            base: 1.6,
                            stops: [
                                [9, 1.5],
                                [22, 100],
                            ],
                        },
                    }}
                />
            </Source>
            <Source type="geojson" data={buildGeoJsonPointFromCoordinates(endpoints[0].coordinates)}>
                <Layer
                    type="circle"
                    paint={{
                        "circle-radius": {
                            type: "exponential",
                            base: 1.6,
                            stops: [
                                [9, 2.5],
                                [22, 250],
                            ],
                        },
                        "circle-color": "#0dcb26",
                        "circle-stroke-color": "#464646",
                        "circle-stroke-width": {
                            type: "exponential",
                            base: 1.6,
                            stops: [
                                [9, 1.5],
                                [22, 100],
                            ],
                        },
                    }}
                />
            </Source>
            <Source type="geojson" data={buildGeoJsonPointFromCoordinates(endpoints[1].coordinates)}>
                <Layer
                    type="circle"
                    paint={{
                        "circle-radius": {
                            type: "exponential",
                            base: 1.6,
                            stops: [
                                [9, 2.5],
                                [22, 250],
                            ],
                        },
                        "circle-color": "#f54242",
                        "circle-stroke-color": "#464646",
                        "circle-stroke-width": {
                            type: "exponential",
                            base: 1.6,
                            stops: [
                                [9, 1.5],
                                [22, 100],
                            ],
                        },
                    }}
                />
            </Source>
        </Map>
    );
};
