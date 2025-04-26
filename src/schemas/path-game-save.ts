import { z } from "zod";
import { findMetroStationById } from "@/utils/metro";
import { PathGameType } from "@/contexts/path-game/path-game.type";
import { MetroStation } from "@/types/metro-station";

type PathGameSaveType = Omit<PathGameType, "current"> & {
    current: Pick<PathGameType["current"], "date"> & {
        discoveredStations: Array<MetroStation>;
    };
};

export const pathGameSave = z
    .object({
        game: z.object({ date: z.string().date(), guesses: z.array(z.string()) }),
        victoriesHistory: z.array(z.string().date()),
    })
    .transform(
        ({ game, victoriesHistory }, ctx): PathGameSaveType => ({
            current: {
                date: new Date(game.date),
                discoveredStations: game.guesses.map((name) => {
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
            history: victoriesHistory.map((dateStr) => ({
                date: new Date(dateStr),
                hasWon: true,
            })),
        }),
    );
export type PathGameSaveSchemaEncodedType = z.input<typeof pathGameSave>;
export type PathGameSaveSchemaType = z.infer<typeof pathGameSave>;
