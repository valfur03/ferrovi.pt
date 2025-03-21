"use client";

import { PropsWithChildren, useCallback, useMemo, useReducer } from "react";
import { GameContext } from "@/contexts/game/game.context";
import { gameReducer } from "@/contexts/game/game.reducer";
import { findMetroStationByName } from "@/utils/metro";

export type GameProviderProps = PropsWithChildren;

export const GameProvider = ({ children }: GameProviderProps) => {
    const [state, dispatch] = useReducer(gameReducer, null);

    const init = useCallback(() => {
        return dispatch({ type: "INIT" });
    }, []);

    const makeGuess = useCallback((guess: string) => {
        const station = findMetroStationByName(guess);
        if (station === undefined) {
            return false;
        }

        dispatch({ type: "MAKE_GUESS", payload: station });
        return true;
    }, []);

    const latestGuess = useMemo(() => {
        if (state === null || state.guesses.length <= 0) {
            return null;
        }

        return state.guesses[state.guesses.length - 1];
    }, [state]);

    const value = useMemo(() => ({ state, init, makeGuess, latestGuess }), [state, init, makeGuess, latestGuess]);

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
