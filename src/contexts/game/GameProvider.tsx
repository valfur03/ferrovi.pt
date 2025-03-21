"use client";

import { PropsWithChildren, useCallback, useMemo, useReducer } from "react";
import { GameContext } from "@/contexts/game/game.context";
import { gameReducer } from "@/contexts/game/game.reducer";
import { metroStations } from "@/data/metro-stations";

export type GameProviderProps = PropsWithChildren;

export const GameProvider = ({ children }: GameProviderProps) => {
    const [state, dispatch] = useReducer(gameReducer, null);

    const init = useCallback(() => {
        return dispatch({ type: "INIT" });
    }, []);

    const makeGuess = useCallback((guess: string) => {
        if (!metroStations.find(({ name }) => name === guess)) {
            return false;
        }

        dispatch({ type: "MAKE_GUESS", payload: guess });
        return true;
    }, []);

    const value = useMemo(() => ({ state, init, makeGuess }), [state, init, makeGuess]);

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
