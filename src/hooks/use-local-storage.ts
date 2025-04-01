"use client";

import { useCallback, useMemo } from "react";

export const useLocalStorage = () => {
    const getItem = useCallback((key: string) => {
        if (typeof window === "undefined") {
            return null;
        }

        return localStorage.getItem(key);
    }, []);

    const setItem = useCallback((key: string, value: string) => {
        if (typeof window === "undefined") {
            return;
        }

        return localStorage.setItem(key, value);
    }, []);

    return useMemo(() => ({ getItem, setItem }), [getItem, setItem]);
};
