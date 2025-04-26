import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const useLocalStorageSyncedState = (key: string) => {
    const ls = useLocalStorage(key);

    const useLocalStorageStateSynchronization = <T>(state: T, stringify: (value: T) => string) => {
        useEffect(() => {
            ls.setItem(stringify(state));
        }, [state, stringify]);
    };

    return { getItem: ls.getItem, useLocalStorageStateSynchronization };
};
