"use client";

import { GameProblemStation } from "@/components/Game/shared/components/GameProblemStation";
import { useGeoGame } from "@/contexts/geo-game/use-geo-game";

export const GeoGameDashboard = () => {
    const { currentStation, score } = useGeoGame();

    if (currentStation === null) {
        return null;
    }

    return (
        <div className="w-full p-4 max-w-xs md:px-0 grid grid-cols-[3fr_1fr] gap-3">
            <GameProblemStation>{currentStation.name}</GameProblemStation>
            <div className="text-center">
                <p className="text-sm text-neutral-600">Score</p>
                <p className="font-bold text-xl">{score}</p>
            </div>
        </div>
    );
};
