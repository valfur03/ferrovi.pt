"use client";

import { useGeoGame } from "@/contexts/geo-game/use-geo-game";
import { useCallback, useEffect, useState } from "react";
import { MapboxConfiguration } from "@/config/mapbox";
import { GeoGameMap } from "@/components/GeoGame/shared/components/GeoGameMap";
import { MetroStation } from "@/types/metro-station";
import { GeoGameValidation } from "@/components/GeoGame/shared/components/GeoGameValidation";
import { GeoGameDashboard } from "@/components/GeoGame/shared/components/GeoGameDashboard";
import { GeoGameVictoryDialog } from "@/components/GeoGame/shared/components/GeoGameVictoryDialog";

export type GeoGameProps = {
    solutions: Array<MetroStation>;
    mapboxConfiguration: MapboxConfiguration;
};

export const GeoGame = ({ solutions, mapboxConfiguration }: GeoGameProps) => {
    const { init, initialized } = useGeoGame();
    const [mapPointSelection, setMapPointSelection] = useState<{ coordinates: [number, number] } | null>(null);

    const resetMapPointSelection = useCallback(() => {
        setMapPointSelection(null);
    }, []);

    useEffect(() => {
        if (!initialized) {
            init({ solutions });
        }
    }, [initialized, solutions, init]);

    return (
        <>
            <GeoGameDashboard />
            <GeoGameMap
                mapPointSelection={mapPointSelection}
                setMapPointSelection={setMapPointSelection}
                {...mapboxConfiguration}
            />
            <GeoGameValidation mapPointSelection={mapPointSelection} resetMapPointSelection={resetMapPointSelection} />
            <GeoGameVictoryDialog />
        </>
    );
};
