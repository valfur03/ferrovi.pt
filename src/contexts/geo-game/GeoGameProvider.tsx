"use client";

import { PropsWithChildren, useCallback, useMemo, useReducer } from "react";
import { GeoGameContext } from "@/contexts/geo-game/geo-game.context";
import { geoGameReducer } from "@/contexts/geo-game/geo-game.reducer";
import { MetroStation } from "@/types/metro-station";
import { haversineDistance } from "@/utils/coordinates";
import { calculateScore } from "@/utils/geo-game";
import { useGeoGameStorage } from "@/hooks/use-geo-game-storage";
import { encodeDateForZod } from "@/utils/date";

export type GeoGameProviderProps = PropsWithChildren;

export const GeoGameProvider = ({ children }: GeoGameProviderProps) => {
    const { save, setSave } = useGeoGameStorage();
    const [state, dispatch] = useReducer(geoGameReducer, null);

    const init = useCallback(
        (options: { solutions: Array<MetroStation> }) => {
            return dispatch({ type: "INIT", payload: { ...options, guesses: save.game.guesses } });
        },
        [save],
    );

    const makeGuess = useCallback(
        (coordinates: [number, number]) => {
            setSave((save) => ({ ...save, game: { ...save.game, guesses: [...save.game.guesses, coordinates] } }));
            return dispatch({ type: "MAKE_GUESS", payload: coordinates });
        },
        [setSave],
    );

    const hasWon = useMemo(() => {
        if (state === null) {
            return false;
        }

        const hasWon = state.solutions.length <= state.guesses.length;

        if (hasWon) {
            setSave((save) => {
                const encodedDate = encodeDateForZod();
                if (save.victoriesHistory.includes(encodedDate)) {
                    return save;
                }

                return { ...save, victoriesHistory: [...save.victoriesHistory, encodedDate] };
            });
        }

        return hasWon;
    }, [setSave, state]);

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
