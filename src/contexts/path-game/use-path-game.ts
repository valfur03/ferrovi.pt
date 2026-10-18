import { PathGameContextType } from "@/contexts/path-game/path-game.context";
import { MetroStation } from "@/types/metro-station";
import { useCallback, useMemo, useReducer } from "react";
import { PathGameAction, pathGameReducer } from "@/contexts/path-game/path-game.reducer";
import { PathGameType } from "@/contexts/path-game/path-game.type";
import { findMetroStationByName } from "@/utils/metro";
import { usePathGameStorage } from "@/contexts/path-game/use-path-game-storage";
import { PathGameSaveSchemaType } from "@/schemas/path-game-save";
import { areNodesConnected, createSubgraph, getShortestPathFromAToB } from "@/lib/metro-graph";
import { metroGraph, metroStations } from "@/data/metro-stations";
import { encodeDateForZod } from "@/utils/date";
import { useIsClient } from "@/hooks/use-is-client";

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
    const isReady = useIsClient();
    const { current, history } = state;

    const makeGuess = useCallback(
        (guess: string) => {
            const stationAlreadyDiscovered = (station: MetroStation) =>
                current.discoveredStations.find(({ id }) => id === station.id) !== undefined;

            const station = findMetroStationByName(guess);
            if (station === undefined) {
                return false;
            }

            if (!stationAlreadyDiscovered(station)) {
                dispatch({ type: "ADD_GUESS", payload: station });
            }

            return true;
        },
        [current],
    );

    const discoveredStationsSubgraph = useMemo(
        () => createSubgraph(metroGraph, [current.endpoints.from, ...current.discoveredStations, current.endpoints.to]),
        [current],
    );

    const hasWon = useMemo(() => {
        const hasWon = areNodesConnected(
            discoveredStationsSubgraph,
            current.endpoints.from.id,
            current.endpoints.to.id,
        );

        if (hasWon) {
            dispatch({ type: "SAVE_VICTORY", payload: { date: new Date() } });
        }

        return hasWon;
    }, [current, discoveredStationsSubgraph]);

    const stats = useMemo(() => {
        const shortestPath = getShortestPathFromAToB(
            discoveredStationsSubgraph,
            current.endpoints.from.id,
            current.endpoints.to.id,
        );
        const stopsValue = shortestPath !== null ? shortestPath.length - 2 : Infinity;
        const guessesValue = current.discoveredStations.length;
        const daysValue =
            history.length === 0
                ? 0
                : history.slice(1).reduce<[number, string]>(
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
                      [1, encodeDateForZod(history[0].date)],
                  )[0];

        return {
            stops: {
                value: stopsValue,
                label: "arrêts",
                isBest: stopsValue <= current.solution.length,
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
    }, [current, history, discoveredStationsSubgraph]);

    return useMemo(() => {
        return {
            isReady,
            gameState: {
                history,
                current: {
                    ...current,
                    stats,
                    hasWon,
                },
            },
            makeGuess,
        };
    }, [isReady, current, history, stats, hasWon, makeGuess]);
};
