"use client";

import { PathGameProblemStation } from "@/components/PathGame/shared/components/PathGameProblemStation";
import { useGeoGameContext } from "@/contexts/geo-game/use-geo-game-context";
import React from "react";

export const GeoGameDashboard = () => {
    const {
        gameState: {
            current: { currentStation, currentScore },
        },
    } = useGeoGameContext();

    return (
        <div className="w-full p-4 max-w-xs md:px-0 grid grid-cols-[3fr_1fr] gap-3">
            {currentStation === null ? (
                <div>
                    <p>
                        Vous avez fini les niveaux d&apos;aujourd&apos;hui, revenez demain pour de nouveaux challenges !
                    </p>
                </div>
            ) : (
                <PathGameProblemStation>{currentStation.name}</PathGameProblemStation>
            )}
            <div className="text-center">
                <p className="text-sm text-neutral-600">Score</p>
                <p className="font-bold text-xl">{currentScore}</p>
            </div>
        </div>
    );
};
