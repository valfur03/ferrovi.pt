import { MAPBOX_PUBLIC_ACCESS_TOKEN } from "@/constants/env";

export type MapboxConfiguration = {
    accessToken: string;
};

export const mapboxConfiguration: MapboxConfiguration = {
    accessToken: MAPBOX_PUBLIC_ACCESS_TOKEN,
};
