"use client";

import { GameProblemStation } from "@/components/Game/shared/components/GameProblemStation";
import { useGeoGame } from "@/contexts/geo-game/use-geo-game";
import React from "react";

export const GeoGameDashboard = () => {
    const { currentStation, score } = useGeoGame();

    return (
        <div className="w-full p-4 max-w-xs md:px-0 grid grid-cols-[3fr_1fr] gap-3">
            {currentStation === null ? (
                <div>
                    <p>
                        Vous avez fini les niveaux d&apos;aujourd&apos;hui, revenez demain pour de nouveaux challenges !
                    </p>
                </div>
            ) : (
                <GameProblemStation>{currentStation.name}</GameProblemStation>
            )}
            <div className="text-center">
                <p className="text-sm text-neutral-600">Score</p>
                <p className="font-bold text-xl">{score}</p>
            </div>
        </div>
    );
};
