import React from "react";
import { MetroStation } from "@/types/metro-station";

export type PathGameContextType = {
    gameState: {
        endpoints: Record<"from" | "to", MetroStation>;
        solution: Array<MetroStation>;
        discoveredStations: Array<MetroStation & { onShortestPath: boolean }>;
        stats: Record<"stops" | "guesses" | "days", { value: React.ReactNode; label: string; isBest: boolean }>;
    };
    makeGuess: (guess: string) => boolean;
};

export const PathGameContext = React.createContext<PathGameContextType | null>(null);
