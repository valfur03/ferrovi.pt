"use client";

import { createContext } from "react";
import { Game } from "@/contexts/game/game.type";
import { MetroStation } from "@/types/metro-station";

export type GameContextType = {
    state: Game | null;
    init: () => void;
    makeGuess: (guess: string) => boolean;
    latestGuess: MetroStation | null;
    endpoints: Game["endpoints"] | null;
    discoveredPath: Array<MetroStation | null> | null;
};

export const GameContext = createContext<GameContextType | null>(null);
