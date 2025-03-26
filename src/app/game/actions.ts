"use server";

import { metroGraph, metroStations, metroStationsList } from "@/data/metro-stations";
import { getShortestPathFromAToB } from "@/lib/metro-graph";

export const buildRandomMetroStationsPath = async () => {
    const from = Math.floor(Math.random() * metroStationsList.length);
    const to = (from + Math.floor(Math.random() * (metroStationsList.length - 1) + 1)) % metroStationsList.length;

    const solution = getShortestPathFromAToB(metroGraph, metroStationsList[from].id, metroStationsList[to].id);
    return solution.map(([, metroStation]) => {
        return metroStations[metroStation as keyof typeof metroStations];
    });
};
