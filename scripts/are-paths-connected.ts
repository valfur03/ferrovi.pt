#!/usr/bin/env ts-node

import { areNodesConnected } from "@/lib/metro-graph";
import { metroGraph, metroStations } from "@/data/metro-stations";

async function main() {
    const metroSubgraph: typeof metroGraph = new Map();
    const addStation = (id: string) => {
        const node = metroGraph.get(id);
        if (node === undefined) {
            throw new Error("node cannot be omitted");
        }
        metroSubgraph.set(id, node);
    };
    addStation(metroStations.mairieDesLilas.id);
    addStation(metroStations.porteDesLilas.id);
    addStation(metroStations.telegraphe.id);
    addStation(metroStations.placeDesFetes.id);
    addStation(metroStations.jourdain.id);
    addStation(metroStations.pyrenees.id);

    const connected = areNodesConnected(metroSubgraph, metroStations.mairieDesLilas.id, metroStations.pyrenees.id);
    console.log("nodes are %sconnected", connected ? "" : "not ");
}

main();
