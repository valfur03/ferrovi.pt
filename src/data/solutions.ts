import { getShortestPathFromAToB } from "@/lib/metro-graph";
import { metroGraph, metroStationsList } from "@/data/metro-stations";

export const allMetroSolutions = Object.fromEntries(
    metroStationsList.map((a) => {
        console.log("generating all solutions from station '%s'", a.id);
        return [
            a.id,
            Object.fromEntries(metroStationsList.map((b) => [b.id, getShortestPathFromAToB(metroGraph, a.id, b.id)])),
        ];
    }),
);
