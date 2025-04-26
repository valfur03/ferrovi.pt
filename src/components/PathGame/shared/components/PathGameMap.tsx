"use client";

import { MapboxConfiguration } from "@/config/mapbox";
import Map, { Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapboxMetroDashedEdge } from "@/lib/mapbox/components/Mapbox/MapboxMetroDashedEdge";
import { MapboxMetroFilledEdge } from "@/lib/mapbox/components/Mapbox/MapboxMetroFilledEdge";
import { MapboxMetroDiscoveredNode } from "@/lib/mapbox/components/Mapbox/MapboxMetroDiscoveredNode";
import * as React from "react";
import { MapboxMetroFromNode } from "@/lib/mapbox/components/Mapbox/MapboxMetroFromNode";
import { MapboxMetroToNode } from "@/lib/mapbox/components/Mapbox/MapboxMetroToNode";
import { usePathGameContext } from "@/contexts/path-game/use-path-game-context";
import { VictoryConfetti } from "@/components/VictoryConfetti/VictoryConfetti";
import { buildMapLayers } from "@/components/PathGame/shared/utils/build-map-layers";

export type GameMapProps = MapboxConfiguration;

export const PathGameMap = ({ accessToken }: GameMapProps) => {
    const { gameState } = usePathGameContext();
    const { endpointsGeoJson, metroStationsGeoJson, rightPathsGeoJson, wrongPathsGeoJson } = buildMapLayers(
        gameState.current,
    );

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
                <Source type="geojson" data={endpointsGeoJson.from}>
                    <MapboxMetroFromNode />
                </Source>
                <Source type="geojson" data={endpointsGeoJson.to}>
                    <MapboxMetroToNode />
                </Source>
            </Map>
            {gameState.current.hasWon && <VictoryConfetti />}
        </div>
    );
};
