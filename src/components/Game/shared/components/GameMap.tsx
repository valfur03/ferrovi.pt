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

export type GameMapProps = MapboxConfiguration;

export const GameMap = ({ accessToken }: GameMapProps) => {
    const { initialized, endpointsGeoJson, metroStationsGeoJson, rightPathsGeoJson, wrongPathsGeoJson } = useGameMap();

    if (!initialized) {
        return null;
    }

    return (
        <div className="w-full max-w-screen-md grow md:grow-0 md:h-128">
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
            </Map>
        </div>
    );
};
