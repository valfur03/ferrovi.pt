"use client";

import { useGeoGame } from "@/contexts/geo-game/use-geo-game";
import { useEffect, useState } from "react";
import { MapboxConfiguration } from "@/config/mapbox";
import { GeoGameMap } from "@/components/GeoGame/shared/components/GeoGameMap";
import { MetroStation } from "@/types/metro-station";
import { GeoGameValidation } from "@/components/GeoGame/shared/components/GeoGameValidation";
import { GeoGameStation } from "@/components/GeoGame/shared/components/GeoGameStation";

export type GeoGameProps = {
    solutions: Array<MetroStation>;
    mapboxConfiguration: MapboxConfiguration;
};

export const GeoGame = ({ solutions, mapboxConfiguration }: GeoGameProps) => {
    const { init, initialized } = useGeoGame();
    const [mapPointSelection, setMapPointSelection] = useState<{ coordinates: [number, number] } | null>(null);

    useEffect(() => {
        if (!initialized) {
            init({ solutions });
        }
    }, [initialized, solutions, init]);

    return (
        <>
            <GeoGameStation />
            <GeoGameMap
                mapPointSelection={mapPointSelection}
                setMapPointSelection={setMapPointSelection}
                {...mapboxConfiguration}
            />
            <GeoGameValidation mapPointSelection={mapPointSelection} />
        </>
    );
};
