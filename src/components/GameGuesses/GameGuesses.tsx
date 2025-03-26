"use client";

import { useGame } from "@/contexts/game/use-game";

export const GameGuesses = () => {
    const { endpoints, discoveredPath } = useGame();

    if (endpoints === null || discoveredPath === null) {
        return null;
    }

    const [from, to] = endpoints;

    return (
        <div className="sm:w-sm">
            <p>
                <b>{from.name}</b>
            </p>
            <p>
                <b>{to.name}</b>
            </p>
        </div>
    );
};
