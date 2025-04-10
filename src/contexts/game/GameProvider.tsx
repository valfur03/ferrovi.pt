"use client";

import { PropsWithChildren, useCallback, useMemo, useReducer } from "react";
import { GameContext } from "@/contexts/game/game.context";
import { gameReducer } from "@/contexts/game/game.reducer";
import { findMetroStationByName } from "@/utils/metro";
import { MetroStation } from "@/types/metro-station";
import { useGameStorage } from "@/hooks/use-game-storage";
import { encodeDateForZod } from "@/utils/date";
import { areNodesConnected, createSubgraph } from "@/lib/metro-graph";
import { metroGraph } from "@/data/metro-stations";

export type GameProviderProps = PropsWithChildren;

export const GameProvider = ({ children }: GameProviderProps) => {
    const { save, setSave } = useGameStorage();
    const [state, dispatch] = useReducer(gameReducer, null);

    const init = useCallback(
        (options: { path: Array<MetroStation> }) => {
            return dispatch({ type: "INIT", payload: { ...options, guesses: save.game.guesses } });
        },
        [save],
    );

    const makeGuess = useCallback(
        (guess: string) => {
            const station = findMetroStationByName(guess);
            if (state === null || station === undefined) {
                return false;
            }

            if (!state.guesses.find(({ id }) => id === station.id)) {
                setSave((save) => ({ ...save, game: { ...save.game, guesses: save.game.guesses.concat(station) } }));
                dispatch({ type: "ADD_GUESS", payload: station });
            }

            return true;
        },
        [state, setSave],
    );

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

    const discoveredStations = useMemo(() => {
        if (state === null) {
            return null;
        }

        return state?.guesses
            .map((guess) => ({
                ...guess,
                rightGuess: !!state.solution.find(({ id }) => id === guess.id),
            }))
            .concat(state.endpoints.map((metroStation) => ({ ...metroStation, rightGuess: true })));
    }, [state]);

    const hasWon = useMemo(() => {
        if (state === null || discoveredPath === null || discoveredStations === null) {
            return false;
        }

        const hasWon =
            discoveredPath.find((metroStations) => metroStations === null) === undefined ||
            areNodesConnected(
                createSubgraph(metroGraph, discoveredStations),
                state.endpoints[0].id,
                state.endpoints[1].id,
            );

        const encodedDate = encodeDateForZod();
        if (hasWon) {
            setSave((save) => {
                if (save.victoriesHistory.includes(encodedDate)) {
                    return save;
                }

                return { ...save, victoriesHistory: [...save.victoriesHistory, encodedDate] };
            });
        }

        return hasWon;
    }, [discoveredPath, discoveredStations, setSave, state]);

    const value = useMemo(() => {
        return {
            init,
            initialized: state !== null,
            makeGuess,
            latestGuess,
            discoveredPath,
            discoveredStations,
            hasWon,
            endpoints: state?.endpoints ?? null,
            hasPlayed: state?.hasPlayed ?? false,
        };
    }, [state, init, makeGuess, latestGuess, discoveredPath, discoveredStations, hasWon]);

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
