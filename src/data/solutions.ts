import { getShortestPathFromAToB } from "@/lib/metro-graph";
import { metroGraph, metroStationsList } from "@/data/metro-stations";

export const allMetroSolutions = metroStationsList.map((a) => {
    console.log("generating all solutions from station '%s'", a.id);
    return metroStationsList.map((b) => ({
        from: a.id,
        to: b.id,
        path: getShortestPathFromAToB(metroGraph, a.id, b.id),
    }));
});
