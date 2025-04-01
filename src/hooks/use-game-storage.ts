import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { findMetroStationById } from "@/utils/metro";
import { encodeDateForZod } from "@/utils/date";

export const LOCAL_STORAGE_KEY = "game";

// TODO move out
export const saveSchema = z
    .object({
        game: z.object({ date: z.string().date(), guesses: z.array(z.string()) }),
        victoriesHistory: z.array(z.string().date()),
    })
    .transform(({ game, ...rest }, ctx) => ({
        ...rest,
        game: {
            ...game,
            guesses: game.guesses.map((name) => {
                const metroStation = findMetroStationById(name);
                if (metroStation === undefined) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "Not a metro station",
                    });
                    return z.NEVER;
                }
                return metroStation;
            }),
        },
    }));
export type SaveSchemaEncodedType = z.input<typeof saveSchema>;
export type SaveSchemaType = z.infer<typeof saveSchema>;

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
            const newSave: SaveSchemaType = { game: { date: encodeDateForZod(), guesses: [] }, victoriesHistory: [] };
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
