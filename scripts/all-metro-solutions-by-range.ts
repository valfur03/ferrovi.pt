#!/usr/bin/env ts-node

import { allMetroSolutions } from "@/data/solutions";

// number of steps / number of occurences
export type SolutionsStats = Record<string, number>;

async function main() {
    const stats = Object.entries(allMetroSolutions).reduce<Record<string, number>>((acc, [, solutionsFrom]) => {
        const stats = Object.entries(solutionsFrom).reduce<Record<string, number>>((acc, [, solution]) => {
            return {
                ...acc,
                [solution.length]: (acc[solution.length] ?? 0) + 1,
            };
        }, {});

        return {
            ...acc,
            ...Object.fromEntries(Object.entries(stats).map(([key, value]) => [key, (acc[key] ?? 0) + value])),
        };
    }, {});

    console.log(stats);
}

main();
