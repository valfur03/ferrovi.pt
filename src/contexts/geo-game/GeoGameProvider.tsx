"use client";

import { PropsWithChildren, useCallback, useMemo, useReducer } from "react";
import { GeoGameContext } from "@/contexts/geo-game/geo-game.context";
import { geoGameReducer } from "@/contexts/geo-game/geo-game.reducer";
import { MetroStation } from "@/types/metro-station";

export type GeoGameProviderProps = PropsWithChildren;

export const GeoGameProvider = ({ children }: GeoGameProviderProps) => {
    const [state, dispatch] = useReducer(geoGameReducer, null);

    const init = useCallback((options: { solutions: Array<MetroStation> }) => {
        return dispatch({ type: "INIT", payload: options });
    }, []);

    const makeGuess = useCallback((coordinates: [number, number]) => {
        return dispatch({ type: "MAKE_GUESS", payload: coordinates });
    }, []);

    const solutions = useMemo(() => {
        if (state === null) {
            return [];
        }

        return state.solutions.slice(0, state.guesses.length);
    }, [state]);

    const hasWon = useMemo(() => {
        return false;
    }, []);

    const value = useMemo(() => {
        return {
            init,
            initialized: state !== null,
            makeGuess,
            solutions,
            hasWon,
            hasPlayed: state?.hasPlayed ?? false,
        };
    }, [init, state, makeGuess, solutions, hasWon]);

    return <GeoGameContext.Provider value={value}>{children}</GeoGameContext.Provider>;
};
