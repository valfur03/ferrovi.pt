"use client";

import { PathGameFromTo } from "@/components/PathGame/shared/components/PathGameFromTo";
import { MetroStation } from "@/types/metro-station";
import { MapboxConfiguration } from "@/config/mapbox";
import { PathGameMap } from "@/components/PathGame/shared/components/PathGameMap";
import { PathGameInput } from "@/components/PathGame/shared/components/PathGameInput";
import { PathGameVictoryDialog } from "@/components/PathGame/shared/components/PathGameVictoryDialog";
import { usePathGame } from "@/contexts/path-game/use-path-game";
import { PathGameProvider } from "@/contexts/path-game/PathGameProvider";

export type GameProps = {
    mapboxConfiguration: MapboxConfiguration;
    from: MetroStation;
    to: MetroStation;
};

export const PathGame = ({ mapboxConfiguration, from, to }: GameProps) => {
    const game = usePathGame({ from, to });

    return (
        <PathGameProvider {...game}>
            <PathGameFromTo />
            <PathGameMap {...mapboxConfiguration} />
            <PathGameInput />
            <PathGameVictoryDialog />
        </PathGameProvider>
    );
};
