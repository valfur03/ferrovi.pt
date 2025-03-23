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
): Array<[Array<string> | null, string]> => {
    if (a === b) {
        return [[null, a]];
    }

    const costs = new Map<string, { cost: number; path: Array<[Array<string>, string]>; visited: boolean }>();

    for (const [nodeId] of graph.entries()) {
        costs.set(nodeId, { cost: nodeId === a ? 0 : Infinity, path: [], visited: false });
    }

    const targetNode = costs.get(b);
    if (targetNode === undefined) {
        throw new Error("node is not supposed to be omitted");
    }

    let nearestUnvisitedNode = a;
    let currentLine: Array<string> | null = null;
    while (nearestUnvisitedNode !== b) {
        // console.log("%s is the nearest unvisited node", nearestUnvisitedNode);
        const edgesFromNode = graph.get(nearestUnvisitedNode);

        if (edgesFromNode === undefined) {
            throw new Error("node is not supposed to be omitted");
        }

        const currentNode = costs.get(nearestUnvisitedNode);
        if (currentNode === undefined) {
            throw new Error("node is not supposed to be omitted");
        }
        // console.log("at a cost of %d", currentNode.cost);

        const currentCost = currentNode.cost + 1;
        for (const [[line, siblingObject]] of edgesFromNode.entries()) {
            const costToSibling = currentCost + (currentLine !== null && !currentLine.includes(line) ? 1 : 0);
            const sibling = costs.get(siblingObject.id);

            if (sibling === undefined) {
                throw new Error("node is not supposed to be omitted");
            }

            // console.log("  cost to sibling %s: %d (current cost is %d)", siblingObject.id, costToSibling, sibling.cost);
            if (sibling.cost > costToSibling) {
                sibling.cost = costToSibling;
                sibling.path = [...currentNode.path, [[line], nearestUnvisitedNode]];
                // console.log("  shorter path discovered => %s (cost: %d)", JSON.stringify(sibling.path), sibling.cost);
            } else if (sibling.cost === costToSibling) {
                const latestStop = sibling.path.at(-1);
                if (latestStop === undefined) {
                    throw new Error("sibling cannot not have path");
                }
                if (latestStop[1] === nearestUnvisitedNode) {
                    sibling.path = [
                        ...structuredClone(sibling.path.slice(0, -1)),
                        [[...latestStop[0], line], latestStop[1]],
                    ];
                    // console.log(
                    //     "  equivalent path discovered => %s (cost: %d)",
                    //     JSON.stringify(sibling.path),
                    //     sibling.cost,
                    // );
                }
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

        // console.log("current target node path => %O", targetNode.path);
    }

    return [...targetNode.path, [targetNode.path[targetNode.path.length - 1][0], nearestUnvisitedNode]];
};
