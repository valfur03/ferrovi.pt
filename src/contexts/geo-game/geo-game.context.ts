import React from "react";
import { GeoGameType } from "@/contexts/geo-game/geo-game.type";

export type GeoGameContextType = {
    isReady: boolean;
    gameState: GeoGameType;
    makeGuess: (coordinates: [number, number]) => void;
};

export const GeoGameContext = React.createContext<GeoGameContextType | null>(null);
