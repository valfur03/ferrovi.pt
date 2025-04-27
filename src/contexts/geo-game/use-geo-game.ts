import { GeoGameContextType } from "@/contexts/geo-game/geo-game.context";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { GeoGameAction, geoGameReducer } from "@/contexts/geo-game/geo-game.reducer";
import { GeoGameType } from "@/contexts/geo-game/geo-game.type";
import { useGeoGameStorage } from "@/contexts/geo-game/use-geo-game-storage";
import { GeoGameSaveSchemaType } from "@/schemas/geo-game-save";
import { MetroStation } from "@/types/metro-station";
import { encodeDateForZod } from "@/utils/date";
import { getGeoGameScores, sumGeoGameScores } from "@/utils/geo-game";

export type StaticGeoGameType = Omit<GeoGameType, "current"> & {
    current: Omit<GeoGameType["current"], "currentStation" | "stats" | "currentScore" | "hasWon">;
};

export type UseGeoGameOptions = {
    solutions: Array<MetroStation>;
};

export const initGameState =
    (getFromLocalStorage: () => GeoGameSaveSchemaType | null) =>
    ({ solutions }: UseGeoGameOptions): StaticGeoGameType => {
        const save = getFromLocalStorage();

        return {
            current: {
                date: new Date(),
                solutions,
                guesses:
                    save !== null && encodeDateForZod(save.current.date) === encodeDateForZod()
                        ? save?.current.guesses
                        : [],
            },
            history: save?.history ?? [],
        };
    };

export const useGeoGame = (options: UseGeoGameOptions): GeoGameContextType => {
    const { getFromLocalStorage, useGeoGameStorageSynchronization } = useGeoGameStorage();
    const [state, dispatch] = useReducer<StaticGeoGameType, UseGeoGameOptions, [GeoGameAction]>(
        geoGameReducer,
        options,
        initGameState(getFromLocalStorage),
    );
    useGeoGameStorageSynchronization(state);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, []);

    const currentStation = useMemo(() => {
        const station = state.current.solutions.at(state.current.guesses.length);

        return station ?? null;
    }, [state]);

    const makeGuess = useCallback((coordinates: [number, number]) => {
        return dispatch({ type: "ADD_GUESS", payload: coordinates });
    }, []);

    const hasWon = useMemo(() => {
        const hasWon = state.current.guesses.length >= state.current.solutions.length;

        if (hasWon) {
            dispatch({ type: "SAVE_VICTORY", payload: { date: new Date() } });
        }

        return hasWon;
    }, [state]);

    const stats = useMemo(() => {
        return getGeoGameScores(state.current);
    }, [state]);

    const currentScore = useMemo(() => {
        return sumGeoGameScores(stats);
    }, [stats]);

    return useMemo(() => {
        return {
            isReady,
            gameState: {
                ...state,
                current: {
                    ...state.current,
                    currentStation,
                    stats,
                    currentScore,
                    hasWon,
                },
            },
            makeGuess,
        };
    }, [isReady, state, currentStation, stats, currentScore, hasWon, makeGuess]);
};
