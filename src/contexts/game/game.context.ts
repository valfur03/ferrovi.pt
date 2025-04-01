"use client";

import { createContext } from "react";
import { Game } from "@/contexts/game/game.type";
import { MetroStation } from "@/types/metro-station";

export type GameContextType = {
    init: (options: { path: Array<MetroStation> }) => void;
    initialized: boolean;
    makeGuess: (guess: string) => boolean;
    latestGuess: MetroStation | null;
    endpoints: Game["endpoints"] | null;
    discoveredPath: Array<MetroStation | null> | null;
    discoveredStations: Array<MetroStation & { rightGuess: boolean }> | null;
    hasWon: boolean;
    hasPlayed: boolean;
};

export const GameContext = createContext<GameContextType | null>(null);
