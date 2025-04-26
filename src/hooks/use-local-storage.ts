"use client";

import { useCallback, useMemo } from "react";

export const useLocalStorage = (key: string) => {
    const getItem = useCallback(() => {
        if (typeof window === "undefined") {
            return null;
        }

        return localStorage.getItem(key);
    }, [key]);

    const setItem = useCallback(
        (value: string) => {
            if (typeof window === "undefined") {
                return;
            }

            return localStorage.setItem(key, value);
        },
        [key],
    );

    return useMemo(() => ({ getItem, setItem }), [getItem, setItem]);
};
