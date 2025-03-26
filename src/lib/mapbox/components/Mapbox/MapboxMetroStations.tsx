"use client";

import * as React from "react";
import Map, { Layer, Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { FeatureCollection } from "geojson";
import { useGame } from "@/contexts/game/use-game";

export type MapboxMetroStationsProps = {
    accessToken: string;
};

export const MapboxMetroStations = ({ accessToken }: MapboxMetroStationsProps) => {
    const { discoveredStations, endpoints } = useGame();

    if (discoveredStations === null || endpoints === null) {
        return null;
    }

    const geojson: FeatureCollection = {
        type: "FeatureCollection",
        features: discoveredStations.concat(endpoints).map(({ coordinates }) => {
            return {
                type: "Feature",
                properties: null,
                geometry: {
                    type: "Point",
                    coordinates,
                },
            };
        }),
    };

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
            <Source type="geojson" data={geojson}>
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
        </Map>
    );
};
