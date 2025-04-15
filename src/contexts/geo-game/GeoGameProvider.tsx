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

    const hasWon = useMemo(() => {
        return false;
    }, []);

    const value = useMemo(() => {
        return {
            init,
            initialized: state !== null,
            makeGuess,
            hasWon,
            hasPlayed: state?.hasPlayed ?? false,
        };
    }, [init, state, makeGuess, hasWon]);

    return <GeoGameContext.Provider value={value}>{children}</GeoGameContext.Provider>;
};
