"use client";

import { createContext } from "react";
import { Game } from "@/contexts/game/game.type";

export type GameContextType = { state: Game | null; init: () => void; makeGuess: (guess: string) => void };

export const GameContext = createContext<GameContextType | null>(null);
