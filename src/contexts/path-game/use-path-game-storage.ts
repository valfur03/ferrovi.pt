import { StaticPathGameType } from "@/contexts/path-game/use-path-game";
import { useLocalStorageSyncedState } from "@/hooks/use-local-storage-synced-state";
import { getGameModeLocalStorageKey } from "@/utils/game-modes";
import { useCallback } from "react";
import { pathGameSave, PathGameSaveSchemaEncodedType } from "@/schemas/path-game-save";
import { encodeDateForZod } from "@/utils/date";

const LOCAL_STORAGE_KEY = getGameModeLocalStorageKey("path");

export const usePathGameStorage = () => {
    const parse = useCallback((text: string | null) => {
        if (text === null) {
            return null;
        }

        // TODO implement corrupt save error boundary
        return pathGameSave.parse(JSON.parse(text));
    }, []);
    const stringify = useCallback((value: StaticPathGameType) => {
        const mappedValue: PathGameSaveSchemaEncodedType = {
            game: {
                date: encodeDateForZod(value.current.date),
                guesses: value.current.discoveredStations.map(({ id }) => id),
            },
            victoriesHistory: value.history.filter(({ hasWon }) => hasWon).map(({ date }) => encodeDateForZod(date)),
        };

        return JSON.stringify(mappedValue);
    }, []);

    const { getItem, useLocalStorageStateSynchronization } = useLocalStorageSyncedState(LOCAL_STORAGE_KEY);

    const getFromLocalStorage = useCallback(() => parse(getItem()), [getItem, parse]);
    const usePathGameStorageSynchronization = (state: StaticPathGameType) => {
        useLocalStorageStateSynchronization(state, stringify);
    };

    return { getFromLocalStorage, usePathGameStorageSynchronization };
};
