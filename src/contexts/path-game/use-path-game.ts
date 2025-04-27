import { PathGameContextType } from "@/contexts/path-game/path-game.context";
import { MetroStation } from "@/types/metro-station";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { PathGameAction, pathGameReducer } from "@/contexts/path-game/path-game.reducer";
import { PathGameType } from "@/contexts/path-game/path-game.type";
import { findMetroStationByName } from "@/utils/metro";
import { usePathGameStorage } from "@/contexts/path-game/use-path-game-storage";
import { PathGameSaveSchemaType } from "@/schemas/path-game-save";
import { areNodesConnected, createSubgraph, getShortestPathFromAToB } from "@/lib/metro-graph";
import { metroGraph, metroStations } from "@/data/metro-stations";
import { encodeDateForZod } from "@/utils/date";

export type StaticPathGameType = Omit<PathGameType, "current"> & {
    current: Omit<PathGameType["current"], "stats" | "hasWon">;
};

export type UsePathGameOptions = {
    from: MetroStation;
    to: MetroStation;
};

export const initGameState =
    (getFromLocalStorage: () => PathGameSaveSchemaType | null) =>
    ({ from, to }: UsePathGameOptions): StaticPathGameType => {
        const save = getFromLocalStorage();

        const solution = getShortestPathFromAToB(metroGraph, from.id, to.id)?.map(([, metroStation]) => {
            return metroStations[metroStation as keyof typeof metroStations];
        });
        if (solution === undefined) {
            throw new Error(`There is no solution for problem { from='${from.id} ; to='${to.id}' }`);
        }

        return {
            current: {
                date: new Date(),
                endpoints: {
                    from,
                    to,
                },
                solution,
                discoveredStations:
                    save !== null && encodeDateForZod(save.current.date) === encodeDateForZod()
                        ? (save?.current.discoveredStations.map((station) => ({
                              ...station,
                              onShortestPath: solution.find(({ id }) => id === station.id) !== undefined,
                          })) ?? [])
                        : [],
            },
            history: save?.history ?? [],
        };
    };

export const usePathGame = (options: UsePathGameOptions): PathGameContextType => {
    const { getFromLocalStorage, usePathGameStorageSynchronization } = usePathGameStorage();
    const [state, dispatch] = useReducer<StaticPathGameType, UsePathGameOptions, [PathGameAction]>(
        pathGameReducer,
        options,
        initGameState(getFromLocalStorage),
    );
    usePathGameStorageSynchronization(state);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, []);

    const makeGuess = useCallback(
        (guess: string) => {
            const stationAlreadyDiscovered = (station: MetroStation) =>
                state.current.discoveredStations.find(({ id }) => id === station.id) !== undefined;

            const station = findMetroStationByName(guess);
            if (station === undefined) {
                return false;
            }

            if (!stationAlreadyDiscovered(station)) {
                dispatch({ type: "ADD_GUESS", payload: station });
            }

            return true;
        },
        [state],
    );

    const discoveredStationsSubgraph = useMemo(
        () =>
            createSubgraph(metroGraph, [
                state.current.endpoints.from,
                ...state.current.discoveredStations,
                state.current.endpoints.to,
            ]),
        [state],
    );

    const hasWon = useMemo(() => {
        const hasWon = areNodesConnected(
            discoveredStationsSubgraph,
            state.current.endpoints.from.id,
            state.current.endpoints.to.id,
        );

        if (hasWon) {
            dispatch({ type: "SAVE_VICTORY", payload: { date: new Date() } });
        }

        return hasWon;
    }, [state, discoveredStationsSubgraph]);

    const stats = useMemo(() => {
        const shortestPath = getShortestPathFromAToB(
            discoveredStationsSubgraph,
            state.current.endpoints.from.id,
            state.current.endpoints.to.id,
        );
        const stopsValue = shortestPath !== null ? shortestPath.length - 2 : Infinity;
        const guessesValue = state.current.discoveredStations.length;
        const daysValue =
            state.history.length === 0
                ? 0
                : state.history.slice(1).reduce<[number, string]>(
                      ([streak, prevDateStr], { date: dateStr, hasWon }) => {
                          const date = new Date(dateStr);
                          date.setDate(date.getDate() - 1);
                          const prevDate = new Date(prevDateStr);
                          if (
                              !hasWon ||
                              date.getFullYear() !== prevDate.getFullYear() ||
                              date.getMonth() !== prevDate.getMonth() ||
                              date.getDate() !== prevDate.getDate()
                          ) {
                              return [streak, prevDateStr];
                          }

                          return [streak + 1, encodeDateForZod(dateStr)];
                      },
                      [1, encodeDateForZod(state.history[0].date)],
                  )[0];

        return {
            stops: {
                value: stopsValue,
                label: "arrêts",
                isBest: stopsValue <= state.current.solution.length,
            },
            guesses: {
                value: guessesValue,
                label: "essais",
                isBest: guessesValue <= stopsValue,
            },
            days: {
                value: daysValue,
                label: daysValue > 1 ? "jours consécutifs" : "jour consécutif",
                isBest: true,
            },
        };
    }, [state, discoveredStationsSubgraph]);

    return useMemo(() => {
        return {
            isReady,
            gameState: {
                ...state,
                current: {
                    ...state.current,
                    stats,
                    hasWon,
                },
            },
            makeGuess,
        };
    }, [isReady, state, stats, hasWon, makeGuess]);
};
