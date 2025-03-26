"use client";

import * as React from "react";
import Map, { Layer, Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Feature, FeatureCollection, LineString } from "geojson";
import { useGame } from "@/contexts/game/use-game";
import { buildGeoJsonPointFromCoordinates } from "@/lib/mapbox/utils/build-geo-json-point-from-coordinates";
import { metroGraph } from "@/data/metro-stations";

export type MapboxMetroStationsProps = {
    accessToken: string;
};

export const MapboxMetroStations = ({ accessToken }: MapboxMetroStationsProps) => {
    const { discoveredStations, endpoints } = useGame();

    if (discoveredStations === null || endpoints === null) {
        return null;
    }

    const [rightGeoJson, wrongGeoJson, pathGeoJson] = discoveredStations.reduce<
        [FeatureCollection, FeatureCollection, FeatureCollection<LineString>]
    >(
        ([rightGeoJson, wrongGeoJson, pathGeoJson], { id, rightGuess, coordinates }) => {
            const siblings = metroGraph.get(id);

            if (siblings === undefined) {
                throw new Error("node is not supposed to be omitted");
            }

            const newPath: FeatureCollection<LineString> = {
                ...pathGeoJson,
                features: [
                    ...pathGeoJson.features,
                    ...siblings
                        .values()
                        .map(([, metroStation]): Feature<LineString> | null => {
                            if (
                                !!discoveredStations.find(({ id }) => id === metroStation.id) ||
                                metroStation.id === endpoints[0].id ||
                                metroStation.id === endpoints[1].id
                            ) {
                                return {
                                    type: "Feature",
                                    properties: null,
                                    geometry: {
                                        type: "LineString",
                                        coordinates: [coordinates, metroStation.coordinates],
                                    },
                                };
                            }

                            return null;
                        })
                        .filter((metroStation) => metroStation !== null),
                ],
            };

            if (rightGuess) {
                return [
                    {
                        ...rightGeoJson,
                        features: [...rightGeoJson.features, buildGeoJsonPointFromCoordinates(coordinates)],
                    },
                    wrongGeoJson,
                    newPath,
                ];
            } else {
                return [
                    rightGeoJson,
                    {
                        ...wrongGeoJson,
                        features: [...wrongGeoJson.features, buildGeoJsonPointFromCoordinates(coordinates)],
                    },
                    newPath,
                ];
            }
        },
        [
            {
                type: "FeatureCollection",
                features: [
                    buildGeoJsonPointFromCoordinates(endpoints[0].coordinates),
                    buildGeoJsonPointFromCoordinates(endpoints[1].coordinates),
                ],
            },
            {
                type: "FeatureCollection",
                features: [],
            },
            {
                type: "FeatureCollection",
                features: [],
            },
        ],
    );

    return (
        <Map
            id="game-mapboxgl-map"
            mapboxAccessToken={accessToken}
            mapStyle="mapbox://styles/hintauh/cm8oi8gph004801sk72xbgo2a"
            initialViewState={{
                longitude: 2.332,
                latitude: 48.86,
                zoom: 12,
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
            <Source type="geojson" data={pathGeoJson}>
                <Layer
                    type="line"
                    paint={{
                        "line-width": 4,
                        "line-color": "#000000",
                    }}
                />
            </Source>
            <Source type="geojson" data={rightGeoJson}>
                <Layer
                    type="circle"
                    paint={{
                        "circle-radius": {
                            type: "exponential",
                            base: 1.6,
                            stops: [
                                [9, 3],
                                [22, 190],
                            ],
                        },
                        "circle-color": "#007cbf",
                    }}
                />
            </Source>
            <Source type="geojson" data={wrongGeoJson}>
                <Layer
                    type="circle"
                    paint={{
                        "circle-radius": {
                            type: "exponential",
                            base: 1.5,
                            stops: [
                                [9, 2],
                                [22, 120],
                            ],
                        },
                        "circle-color": "#ff0000",
                    }}
                />
            </Source>
        </Map>
    );
};
