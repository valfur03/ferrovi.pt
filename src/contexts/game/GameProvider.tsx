"use client";

import { PropsWithChildren, useCallback, useMemo, useReducer } from "react";
import { GameContext } from "@/contexts/game/game.context";
import { gameReducer } from "@/contexts/game/game.reducer";
import { findMetroStationByName } from "@/utils/metro";
import { MetroStation } from "@/types/metro-station";

export type GameProviderProps = PropsWithChildren;

export const GameProvider = ({ children }: GameProviderProps) => {
    const [state, dispatch] = useReducer(gameReducer, null);

    const init = useCallback((options: { path: Array<MetroStation> }) => {
        return dispatch({ type: "INIT", payload: options });
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

    const discoveredPath = useMemo(() => {
        if (state === null) {
            return null;
        }

        return state.solution.map((station) =>
            state.guesses.find(({ name }) => name === station.name) ? station : null,
        );
    }, [state]);

    const value = useMemo(
        () => ({ init, makeGuess, latestGuess, discoveredPath, endpoints: state?.endpoints ?? null }),
        [state, init, makeGuess, latestGuess, discoveredPath],
    );

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
