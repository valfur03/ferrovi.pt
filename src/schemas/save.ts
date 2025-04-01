import { z } from "zod";
import { findMetroStationById } from "@/utils/metro";

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
