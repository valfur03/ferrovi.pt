#!/usr/bin/env ts-node

import { getShortestPathFromAToB } from "@/lib/metro-graph";
import { metroGraph, metroStations } from "@/data/metro-stations";

async function main() {
    const path = getShortestPathFromAToB(metroGraph, metroStations.sentier.id, metroStations.gareDAusterlitz.id);
    console.log("Full path: %O\nTotals stop: %d", path, path.length);
}

main();
