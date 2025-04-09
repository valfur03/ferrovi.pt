"use client";

import { MapboxConfiguration } from "@/config/mapbox";
import Map, { Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapboxMetroDashedEdge } from "@/lib/mapbox/components/Mapbox/MapboxMetroDashedEdge";
import { useGameMap } from "@/components/Game/shared/hooks/use-game-map";
import { MapboxMetroFilledEdge } from "@/lib/mapbox/components/Mapbox/MapboxMetroFilledEdge";
import { MapboxMetroDiscoveredNode } from "@/lib/mapbox/components/Mapbox/MapboxMetroDiscoveredNode";
import * as React from "react";
import { MapboxMetroFromNode } from "@/lib/mapbox/components/Mapbox/MapboxMetroFromNode";
import { MapboxMetroToNode } from "@/lib/mapbox/components/Mapbox/MapboxMetroToNode";
import { useGame } from "@/contexts/game/use-game";
import { GameVictoryConfetti } from "@/components/Game/shared/components/GameVictoryConfetti";
import { MapboxMetroNodeLabel } from "@/lib/mapbox/components/Mapbox/MapboxMetroNodeLabel";

export type GameMapProps = MapboxConfiguration;

export const GameMap = ({ accessToken }: GameMapProps) => {
    const { hasWon } = useGame();
    const { initialized, endpointsGeoJson, metroStationsGeoJson, rightPathsGeoJson, wrongPathsGeoJson } = useGameMap();

    if (!initialized) {
        return null;
    }

    return (
        <div className="w-full max-w-screen-md grow md:grow-0 md:h-128 [&_.mapboxgl-ctrl-bottom-right]:max-md:!bottom-2 [&_.mapboxgl-ctrl-bottom]:max-md:!bottom-2 [&_.mapboxgl-ctrl-bottom-left]:max-md:!bottom-2">
            <Map
                mapboxAccessToken={accessToken}
                mapStyle="mapbox://styles/hintauh/cm8oi8gph004801sk72xbgo2a"
                initialViewState={{
                    longitude: 2.332,
                    latitude: 48.86,
                    zoom: 10.2,
                }}
                minZoom={10}
                maxZoom={16}
                maxBounds={[
                    [2.2, 48.5],
                    [2.55, 49],
                ]}
                projection="globe"
                reuseMaps
            >
                <Source type="geojson" data={wrongPathsGeoJson}>
                    <MapboxMetroDashedEdge />
                </Source>
                <Source type="geojson" data={rightPathsGeoJson}>
                    <MapboxMetroFilledEdge />
                </Source>
                <Source type="geojson" data={metroStationsGeoJson}>
                    <MapboxMetroDiscoveredNode />
                </Source>
                <Source type="geojson" data={endpointsGeoJson[0]}>
                    <MapboxMetroFromNode />
                </Source>
                <Source type="geojson" data={endpointsGeoJson[1]}>
                    <MapboxMetroToNode />
                </Source>
                {metroStationsGeoJson.features.map((feature) => (
                    <Source
                        type="geojson"
                        data={{
                            ...feature,
                            geometry: {
                                ...feature.geometry,
                                coordinates: [
                                    feature.geometry.coordinates[0],
                                    feature.geometry.coordinates[1] + 0.0005,
                                ],
                            },
                        }}
                        key={feature.properties.label}
                    >
                        <MapboxMetroNodeLabel>{feature.properties.label}</MapboxMetroNodeLabel>
                    </Source>
                ))}
            </Map>
            {hasWon && <GameVictoryConfetti />}
        </div>
    );
};
