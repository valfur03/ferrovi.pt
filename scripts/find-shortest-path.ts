#!/usr/bin/env ts-node

import { getShortestPathFromAToB } from "@/lib/metro-graph";
import { metroGraph, metroStations } from "@/data/metro-stations";

async function main() {
    console.log(getShortestPathFromAToB(metroGraph, metroStations.carrefourPleyel.id, metroStations.laDhuys.id));
}

main();
