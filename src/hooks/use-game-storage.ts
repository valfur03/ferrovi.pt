import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect, useMemo, useState } from "react";
import { encodeDateForZod } from "@/utils/date";
import { saveSchema, SaveSchemaEncodedType, SaveSchemaType } from "@/schemas/save";

export const LOCAL_STORAGE_KEY = "game";

export const useGameStorage = () => {
    const ls = useLocalStorage();

    const saveFromLocalStorage: SaveSchemaType = (() => {
        const strData = ls.getItem(LOCAL_STORAGE_KEY);

        if (strData === null) {
            const newSave: SaveSchemaType = { game: { date: encodeDateForZod(), guesses: [] }, victoriesHistory: [] };
            ls.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSave));
            return newSave;
        }

        // TODO handle throw
        const data = saveSchema.parse(JSON.parse(strData));

        if (encodeDateForZod() !== data.game.date) {
            const newSave: SaveSchemaType = { ...data, game: { date: encodeDateForZod(), guesses: [] } };
            ls.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSave));
            return newSave;
        }

        return data;
    })();
    const [save, setSave] = useState(saveFromLocalStorage);

    useEffect(() => {
        const encodedSave: SaveSchemaEncodedType = {
            ...save,
            game: { ...save.game, guesses: save.game.guesses.map(({ id }) => id) },
        };
        ls.setItem(LOCAL_STORAGE_KEY, JSON.stringify(encodedSave));
    }, [save, ls]);

    return useMemo(() => ({ save, setSave }), [save]);
};
