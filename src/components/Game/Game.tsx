"use client";

import { GameFromTo } from "@/components/Game/shared/components/GameFromTo";
import { MetroStation } from "@/types/metro-station";
import { useGame } from "@/contexts/game/use-game";
import { useEffect } from "react";
import { MapboxConfiguration } from "@/config/mapbox";
import { GameMap } from "@/components/Game/shared/components/GameMap";
import { GameInput } from "@/components/Game/shared/components/GameInput";
import { GameVictoryDialog } from "@/components/Game/shared/components/GameVictoryDialog";

export type GameProps = {
    mapboxConfiguration: MapboxConfiguration;
    path: Array<MetroStation>;
};

export const Game = ({ mapboxConfiguration, path }: GameProps) => {
    const { init, initialized } = useGame();

    useEffect(() => {
        if (!initialized) {
            init({ path });
        }
    }, [initialized, init, path]);

    return (
        <>
            <GameFromTo />
            <GameMap {...mapboxConfiguration} />
            <GameInput />
            <GameVictoryDialog />
        </>
    );
};
