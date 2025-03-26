"use client";

import { useGame } from "@/contexts/game/use-game";
import { useCallback } from "react";
import { buildRandomMetroStationsPath } from "@/app/game/actions";

export const NewGameButton = () => {
    const { init } = useGame();

    const handleClick = useCallback(async () => {
        const path = await buildRandomMetroStationsPath();

        init({ path });
    }, [init]);

    return (
        <button onClick={handleClick} className="px-4 py-2 bg-emerald-300 cursor-pointer">
            Nouvelle partie
        </button>
    );
};
