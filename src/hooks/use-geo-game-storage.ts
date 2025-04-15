import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect, useMemo, useState } from "react";
import { encodeDateForZod } from "@/utils/date";
import { geoGameSaveSchema, GeoGameSaveSchemaType } from "@/schemas/geo-game-save";

export const LOCAL_STORAGE_KEY = "geo-game";

export const useGeoGameStorage = () => {
    const ls = useLocalStorage();

    const saveFromLocalStorage: GeoGameSaveSchemaType = (() => {
        const strData = ls.getItem(LOCAL_STORAGE_KEY);

        if (strData === null) {
            const newSave: GeoGameSaveSchemaType = {
                game: { date: encodeDateForZod(), guesses: [] },
                victoriesHistory: [],
            };
            ls.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSave));
            return newSave;
        }

        // TODO handle throw
        const data = geoGameSaveSchema.parse(JSON.parse(strData));

        if (encodeDateForZod() !== data.game.date) {
            const newSave: GeoGameSaveSchemaType = { ...data, game: { date: encodeDateForZod(), guesses: [] } };
            ls.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSave));
            return newSave;
        }

        return data;
    })();
    const [save, setSave] = useState(saveFromLocalStorage);

    useEffect(() => {
        ls.setItem(LOCAL_STORAGE_KEY, JSON.stringify(save));
    }, [save, ls]);

    return useMemo(() => ({ save, setSave }), [save]);
};
