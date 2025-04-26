import { z } from "zod";
import { GeoGameType } from "@/contexts/geo-game/geo-game.type";

type GeoGameSaveType = Omit<GeoGameType, "current"> & {
    current: Pick<GeoGameType["current"], "date" | "guesses">;
};

export const geoGameSaveSchema = z
    .object({
        game: z.object({ date: z.string().date(), guesses: z.array(z.tuple([z.number(), z.number()])) }),
        victoriesHistory: z.array(z.string().date()),
    })
    .transform(
        ({ game, victoriesHistory }): GeoGameSaveType => ({
            current: {
                date: new Date(game.date),
                guesses: game.guesses,
            },
            history: victoriesHistory.map((dateStr) => ({
                date: new Date(dateStr),
                score: null,
            })),
        }),
    );
export type GeoGameSaveSchemaEncodedType = z.input<typeof geoGameSaveSchema>;
export type GeoGameSaveSchemaType = z.infer<typeof geoGameSaveSchema>;
