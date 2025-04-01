import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { findMetroStationById } from "@/utils/metro";

export const LOCAL_STORAGE_KEY = "game";

// TODO move out
export const saveSchema = z
    .object({
        guesses: z.array(z.string()),
    })
    .transform(({ guesses, ...rest }, ctx) => ({
        ...rest,
        guesses: guesses.map((name) => {
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
    }));
export type SaveSchemaEncodedType = z.input<typeof saveSchema>;
export type SaveSchemaType = z.infer<typeof saveSchema>;

export const useGameStorage = () => {
    const ls = useLocalStorage();

    const saveFromLocalStorage: SaveSchemaType = (() => {
        const strData = ls.getItem(LOCAL_STORAGE_KEY);

        if (strData === null) {
            const newSave = { guesses: [] };
            ls.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSave));
            return newSave;
        }

        // TODO handle throw
        return saveSchema.parse(JSON.parse(strData));
    })();
    const [save, setSave] = useState(saveFromLocalStorage);

    useEffect(() => {
        const encodedSave: SaveSchemaEncodedType = { ...save, guesses: save.guesses.map(({ id }) => id) };
        ls.setItem(LOCAL_STORAGE_KEY, JSON.stringify(encodedSave));
    }, [save, ls]);

    return useMemo(() => ({ save, setSave }), [save]);
};
