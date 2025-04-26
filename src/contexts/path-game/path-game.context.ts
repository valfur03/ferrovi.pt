import React from "react";
import { PathGameType } from "@/contexts/path-game/path-game.type";

export type PathGameContextType = {
    isReady: boolean;
    gameState: PathGameType;
    makeGuess: (guess: string) => boolean;
};

export const PathGameContext = React.createContext<PathGameContextType | null>(null);
