import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { findMetroStationById } from "@/utils/metro";

export const LOCAL_STORAGE_KEY = "game";

// TODO move out
export const saveSchema = z
    .object({
        game: z.object({ date: z.string().date(), guesses: z.array(z.string()) }),
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

// TODO move out
export const encodeSaveDate = (date: Date = new Date()) =>
    `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

export const useGameStorage = () => {
    const ls = useLocalStorage();

    const saveFromLocalStorage: SaveSchemaType = (() => {
        const strData = ls.getItem(LOCAL_STORAGE_KEY);

        if (strData === null) {
            const newSave: SaveSchemaType = { game: { date: encodeSaveDate(), guesses: [] } };
            ls.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSave));
            return newSave;
        }

        // TODO handle throw
        const data = saveSchema.parse(JSON.parse(strData));

        if (encodeSaveDate() !== data.game.date) {
            const newSave: SaveSchemaType = { game: { date: encodeSaveDate(), guesses: [] } };
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
