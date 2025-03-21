"use client";

import { PropsWithChildren, useCallback, useMemo, useReducer } from "react";
import { GameContext } from "@/contexts/game/game.context";
import { gameReducer } from "@/contexts/game/game.reducer";

export type GameProviderProps = PropsWithChildren;

export const GameProvider = ({ children }: GameProviderProps) => {
    const [state, dispatch] = useReducer(gameReducer, null);

    const init = useCallback(() => {
        return dispatch({ type: "INIT" });
    }, []);

    const makeGuess = useCallback((guess: string) => {
        return dispatch({ type: "MAKE_GUESS", payload: guess });
    }, []);

    const value = useMemo(() => ({ state, init, makeGuess }), [state, init, makeGuess]);

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
