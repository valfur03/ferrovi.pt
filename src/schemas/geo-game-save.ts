import { z } from "zod";

export const geoGameSaveSchema = z.object({
    game: z.object({ date: z.string().date(), guesses: z.array(z.tuple([z.number(), z.number()])) }),
    victoriesHistory: z.array(z.string().date()),
});
export type GeoGameSaveSchemaType = z.infer<typeof geoGameSaveSchema>;
