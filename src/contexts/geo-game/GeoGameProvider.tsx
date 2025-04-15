"use client";

import { PropsWithChildren, useCallback, useMemo, useReducer } from "react";
import { GeoGameContext } from "@/contexts/geo-game/geo-game.context";
import { geoGameReducer } from "@/contexts/geo-game/geo-game.reducer";
import { MetroStation } from "@/types/metro-station";
import { haversineDistance } from "@/utils/coordinates";
import { calculateScore } from "@/utils/geo-game";

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
        if (state === null) {
            return false;
        }

        return state.solutions.length <= state.guesses.length;
    }, [state]);

    const currentStation = useMemo(() => {
        if (state === null || hasWon) {
            return null;
        }

        return state.solutions[state.guesses.length];
    }, [hasWon, state]);

    const guesses = useMemo(() => {
        if (state === null) {
            return [];
        }

        return state.guesses;
    }, [state]);

    const solutions = useMemo(() => {
        if (state === null) {
            return [];
        }

        return state.solutions.slice(0, state.guesses.length);
    }, [state]);

    const score = useMemo(() => {
        return guesses.reduce<number>((acc, coordinates, index) => {
            const solution = solutions[index];
            if (solution === undefined) {
                return acc;
            }

            const [lon1, lat1] = coordinates;
            const [lon2, lat2] = solution.coordinates;
            const distance = haversineDistance(lat1, lon1, lat2, lon2);

            return acc + calculateScore(distance);
        }, 0);
    }, [guesses, solutions]);

    const value = useMemo(() => {
        return {
            init,
            initialized: state !== null,
            makeGuess,
            currentStation,
            guesses,
            score,
            solutions,
            hasWon,
            hasPlayed: state?.hasPlayed ?? false,
        };
    }, [init, state, makeGuess, currentStation, guesses, score, solutions, hasWon]);

    return <GeoGameContext.Provider value={value}>{children}</GeoGameContext.Provider>;
};
