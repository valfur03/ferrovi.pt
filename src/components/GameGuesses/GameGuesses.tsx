"use client";

import { useGame } from "@/contexts/game/use-game";

export const GameGuesses = () => {
    const { endpoints, discoveredPath } = useGame();

    if (endpoints === null || discoveredPath === null) {
        return null;
    }

    const [from, to] = endpoints;

    return (
        <div className="min-w-sm">
            <p>
                <b>{from.name}</b>
            </p>
            <ol className="">
                {discoveredPath.map((metroStation, index) => (
                    <li key={index}>{metroStation !== null ? metroStation.name : "??"}</li>
                ))}
            </ol>
            <p>
                <b>{to.name}</b>
            </p>
        </div>
    );
};
