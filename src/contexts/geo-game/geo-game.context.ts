"use client";

import { createContext } from "react";
import { MetroStation } from "@/types/metro-station";

export type GeoGameContextType = {
    init: (options: { solutions: Array<MetroStation> }) => void;
    initialized: boolean;
    makeGuess: (coordinates: [number, number]) => void;
    currentStation: Omit<MetroStation, "coordinates"> | null;
    guesses: Array<[number, number]>;
    score: number;
    solutions: Array<MetroStation>;
    hasWon: boolean;
    hasPlayed: boolean;
};

export const GeoGameContext = createContext<GeoGameContextType | null>(null);
