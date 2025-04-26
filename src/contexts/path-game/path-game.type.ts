import { MetroStation } from "@/types/metro-station";
import React from "react";

export type PathGameType = {
    current: {
        date: Date;
        endpoints: Record<"from" | "to", MetroStation>;
        solution: Array<MetroStation>;
        discoveredStations: Array<MetroStation & { onShortestPath: boolean }>;
        hasWon: boolean;
        stats: Record<"stops" | "guesses" | "days", { value: React.ReactNode; label: string; isBest: boolean }>;
    };
    history: Array<{ date: Date; hasWon: boolean }>;
};
