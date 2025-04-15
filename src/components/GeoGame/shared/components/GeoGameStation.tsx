"use client";

import { GameProblemStation } from "@/components/Game/shared/components/GameProblemStation";
import { useGeoGame } from "@/contexts/geo-game/use-geo-game";

export const GeoGameStation = () => {
    const { currentStation } = useGeoGame();

    if (currentStation === null) {
        return null;
    }

    return (
        <div className="w-full p-4 max-w-xs md:px-0">
            <GameProblemStation>{currentStation.name}</GameProblemStation>
        </div>
    );
};
