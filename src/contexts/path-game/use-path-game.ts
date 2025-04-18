import { PathGameContextType } from "@/contexts/path-game/path-game.context";
import { MetroStation } from "@/types/metro-station";
import { useMemo } from "react";

export type UsePathGameOptions = {
    from: MetroStation;
    to: MetroStation;
};

export const usePathGame = ({ from, to }: UsePathGameOptions): PathGameContextType => {
    return useMemo(() => {
        return {
            gameState: {
                endpoints: { from, to },
                // TODO implement
                solution: [],
                // TODO implement
                discoveredStations: [],
                // TODO implement
                stats: {
                    stops: { label: "Arrêts", value: 0, isBest: true },
                    guesses: { label: "Essais", value: 0, isBest: true },
                    // TODO plural form
                    days: { label: "Jours consécutifs", value: 0, isBest: true },
                },
            },
            // TODO implement
            makeGuess: (guess: string) => !!guess,
        };
    }, [from, to]);
};
