import { MapboxConfiguration } from "@/config/mapbox";
import Map, { Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import { useCallback } from "react";
import { MapMouseEvent } from "mapbox-gl";
import { MapboxGeoGuessPoint } from "@/lib/mapbox/components/Mapbox/MapboxGeoGuessPoint";
import { MapboxMetroRightNode } from "@/lib/mapbox/components/Mapbox/MapboxMetroRightNode";
import { useGeoGame } from "@/contexts/geo-game/use-geo-game";
import { VictoryConfetti } from "@/components/VictoryConfetti/VictoryConfetti";
import { MapboxGeoGuessDistance } from "@/lib/mapbox/components/Mapbox/MapboxGeoGuessDistance";
import { Feature, LineString } from "geojson";

export type GeoGameMapProps = MapboxConfiguration & {
    mapPointSelection: { coordinates: [number, number] } | null;
    setMapPointSelection: React.Dispatch<React.SetStateAction<{ coordinates: [number, number] } | null>>;
};

export const GeoGameMap = ({ mapPointSelection, setMapPointSelection, accessToken }: GeoGameMapProps) => {
    const { solutions, hasWon, guesses } = useGeoGame();

    const handleClick = useCallback(
        (e: MapMouseEvent) => {
            setMapPointSelection({ coordinates: [e.lngLat.lng, e.lngLat.lat] });
        },
        [setMapPointSelection],
    );

    return (
        <div className="w-full max-w-screen-md grow md:grow-0 md:h-128 [&_.mapboxgl-ctrl-bottom-right]:max-md:!bottom-2 [&_.mapboxgl-ctrl-bottom]:max-md:!bottom-2 [&_.mapboxgl-ctrl-bottom-left]:max-md:!bottom-2">
            <Map
                mapboxAccessToken={accessToken}
                mapStyle="mapbox://styles/hintauh/cm8oi8gph004801sk72xbgo2a"
                onClick={handleClick}
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
                <Source
                    type="geojson"
                    data={{
                        type: "FeatureCollection",
                        features: guesses.reduce<Array<Feature<LineString>>>((acc, coordinates, index) => {
                            const solution = solutions[index];
                            if (solution === undefined) {
                                return acc;
                            }

                            return [
                                ...acc,
                                {
                                    type: "Feature",
                                    properties: {},
                                    geometry: {
                                        type: "LineString",
                                        coordinates: [coordinates, solution.coordinates],
                                    },
                                },
                            ];
                        }, []),
                    }}
                >
                    <MapboxGeoGuessDistance />
                </Source>
                <Source
                    type="geojson"
                    data={{
                        type: "FeatureCollection",
                        features: solutions.map(({ coordinates }) => ({
                            type: "Feature",
                            properties: {},
                            geometry: {
                                type: "Point",
                                coordinates,
                            },
                        })),
                    }}
                >
                    <MapboxMetroRightNode />
                </Source>
                <Source
                    type="geojson"
                    data={{
                        type: "FeatureCollection",
                        features: guesses.map((coordinates) => ({
                            type: "Feature",
                            properties: {},
                            geometry: {
                                type: "Point",
                                coordinates,
                            },
                        })),
                    }}
                >
                    <MapboxGeoGuessPoint />
                </Source>
                {mapPointSelection !== null && (
                    <Source
                        type="geojson"
                        data={{
                            type: "Feature",
                            properties: {},
                            geometry: {
                                type: "Point",
                                coordinates: mapPointSelection.coordinates,
                            },
                        }}
                    >
                        <MapboxGeoGuessPoint />
                    </Source>
                )}
            </Map>
            {hasWon && <VictoryConfetti />}
        </div>
    );
};
