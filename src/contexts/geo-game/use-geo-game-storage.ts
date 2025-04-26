import { StaticGeoGameType } from "@/contexts/geo-game/use-geo-game";
import { useLocalStorageSyncedState } from "@/hooks/use-local-storage-synced-state";
import { getGameModeLocalStorageKey } from "@/utils/game-modes";
import { useCallback } from "react";
import { geoGameSaveSchema, GeoGameSaveSchemaEncodedType } from "@/schemas/geo-game-save";
import { encodeDateForZod } from "@/utils/date";

const LOCAL_STORAGE_KEY = getGameModeLocalStorageKey("geo");

export const useGeoGameStorage = () => {
    const parse = useCallback((text: string | null) => {
        if (text === null) {
            return null;
        }

        // TODO implement corrupt save error boundary
        return geoGameSaveSchema.parse(JSON.parse(text));
    }, []);
    const stringify = useCallback((value: StaticGeoGameType) => {
        const mappedValue: GeoGameSaveSchemaEncodedType = {
            game: {
                date: encodeDateForZod(value.current.date),
                guesses: value.current.guesses,
            },
            victoriesHistory: value.history.map(({ date }) => encodeDateForZod(date)),
        };

        return JSON.stringify(mappedValue);
    }, []);

    const { getItem, useLocalStorageStateSynchronization } = useLocalStorageSyncedState(LOCAL_STORAGE_KEY);

    const getFromLocalStorage = useCallback(() => parse(getItem()), [getItem, parse]);
    const useGeoGameStorageSynchronization = (state: StaticGeoGameType) => {
        useLocalStorageStateSynchronization(state, stringify);
    };

    return { getFromLocalStorage, useGeoGameStorageSynchronization };
};
