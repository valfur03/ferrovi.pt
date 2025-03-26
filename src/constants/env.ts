import { z } from "zod";

export const MAPBOX_PUBLIC_ACCESS_TOKEN = z.string().parse(process.env.MAPBOX_PUBLIC_ACCESS_TOKEN);
