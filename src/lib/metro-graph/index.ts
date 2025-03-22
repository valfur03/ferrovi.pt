import { MetroStation } from "@/types/metro-station";

export const createMetroGraph = (edges: Array<[MetroStation, MetroStation]>): Map<string, Set<MetroStation>> => {
    const map = new Map<string, Set<MetroStation>>();

    edges.forEach(([a, b]) => {
        let nodeA = map.get(a.id);

        if (nodeA === undefined) {
            const set = new Set<MetroStation>();
            map.set(a.id, set);
            nodeA = set;
        }

        nodeA.add(b);
    });

    return map;
};

export const getShortestPathFromAToB = (graph: Map<string, Set<MetroStation>>, a: string, b: string) => {
    const costs = new Map<string, { cost: number; path: Array<string>; visited: boolean }>();

    for (const [nodeId] of graph.entries()) {
        costs.set(nodeId, { cost: nodeId === a ? 0 : Infinity, path: [], visited: false });
    }

    const targetNode = costs.get(b);
    if (targetNode === undefined) {
        throw new Error("node is not supposed to be omitted");
    }

    let nearestUnvisitedNode = a;
    while (nearestUnvisitedNode !== b) {
        const edgesFromNode = graph.get(nearestUnvisitedNode);

        if (edgesFromNode === undefined) {
            throw new Error("node is not supposed to be omitted");
        }

        const currentNode = costs.get(nearestUnvisitedNode);
        if (currentNode === undefined) {
            throw new Error("node is not supposed to be omitted");
        }

        const currentCost = currentNode.cost + 1;
        for (const [siblingObject] of edgesFromNode.entries()) {
            const sibling = costs.get(siblingObject.id);

            if (sibling === undefined) {
                throw new Error("node is not supposed to be omitted");
            }

            if (sibling.cost > currentCost) {
                sibling.cost = currentCost;
                sibling.path = [...currentNode.path, nearestUnvisitedNode];
            }
        }

        currentNode.visited = true;

        let lowestCost = Infinity;
        for (const [nodeId, node] of costs.entries()) {
            if (!node.visited && node.cost < lowestCost) {
                nearestUnvisitedNode = nodeId;
                lowestCost = node.cost;
            }
        }
    }

    return [...targetNode.path, nearestUnvisitedNode];
};
