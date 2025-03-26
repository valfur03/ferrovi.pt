"use client";

import * as React from "react";
import Map, { Layer, Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { FeatureCollection } from "geojson";
import { useGame } from "@/contexts/game/use-game";
import { buildGeoJsonPointFromCoordinates } from "@/lib/mapbox/utils/build-geo-json-point-from-coordinates";

export type MapboxMetroStationsProps = {
    accessToken: string;
};

export const MapboxMetroStations = ({ accessToken }: MapboxMetroStationsProps) => {
    const { discoveredStations, endpoints } = useGame();

    if (discoveredStations === null || endpoints === null) {
        return null;
    }

    const [rightGeoJson, wrongGeoJson] = discoveredStations.reduce<[FeatureCollection, FeatureCollection]>(
        ([rightGeoJson, wrongGeoJson], { rightGuess, coordinates }) => {
            if (rightGuess) {
                return [
                    {
                        ...rightGeoJson,
                        features: [...rightGeoJson.features, buildGeoJsonPointFromCoordinates(coordinates)],
                    },
                    wrongGeoJson,
                ];
            } else {
                return [
                    rightGeoJson,
                    {
                        ...wrongGeoJson,
                        features: [...wrongGeoJson.features, buildGeoJsonPointFromCoordinates(coordinates)],
                    },
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
