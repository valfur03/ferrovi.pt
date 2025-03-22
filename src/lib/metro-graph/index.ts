import { MetroStation } from "@/types/metro-station";
import { MetroLine } from "@/types/metro-line";

export const createMetroGraph = (
    lines: Record<MetroLine, Array<[MetroStation, MetroStation]>>,
): Map<string, Set<[string, MetroStation]>> => {
    const map = new Map<string, Set<[string, MetroStation]>>();

    Object.entries(lines).forEach(([line, edges]) => {
        edges.forEach(([a, b]) => {
            let nodeA = map.get(a.id);

            if (nodeA === undefined) {
                const set = new Set<[string, MetroStation]>();
                map.set(a.id, set);
                nodeA = set;
            }

            nodeA.add([line, b]);
        });
    });

    return map;
};

export const getShortestPathFromAToB = (
    graph: Map<string, Set<[string, MetroStation]>>,
    a: string,
    b: string,
): Array<[string | null, string]> => {
    if (a === b) {
        return [[null, a]];
    }

    const costs = new Map<string, { cost: number; path: Array<[string, string]>; visited: boolean }>();

    for (const [nodeId] of graph.entries()) {
        costs.set(nodeId, { cost: nodeId === a ? 0 : Infinity, path: [], visited: false });
    }

    const targetNode = costs.get(b);
    if (targetNode === undefined) {
        throw new Error("node is not supposed to be omitted");
    }

    let nearestUnvisitedNode = a;
    let currentLine: string | null = null;
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
        for (const [[line, siblingObject]] of edgesFromNode.entries()) {
            const costToSibling = currentCost + (currentLine !== null && line !== currentLine ? 1 : 0);
            const sibling = costs.get(siblingObject.id);

            if (sibling === undefined) {
                throw new Error("node is not supposed to be omitted");
            }

            if (sibling.cost > costToSibling) {
                sibling.cost = costToSibling;
                sibling.path = [...currentNode.path, [line, nearestUnvisitedNode]];
            }
        }

        currentNode.visited = true;

        let lowestCost = Infinity;
        for (const [nodeId, node] of costs.entries()) {
            if (!node.visited && node.cost < lowestCost) {
                nearestUnvisitedNode = nodeId;
                lowestCost = node.cost;
                currentLine = node.path[node.path.length - 1][0];
            }
        }
    }

    return [...targetNode.path, [targetNode.path[targetNode.path.length - 1][0], nearestUnvisitedNode]];
};
