#!/usr/bin/env ts-node

import { writeFileSync } from "node:fs";
import path from "node:path";
import { allMetroSolutions } from "@/data/solutions";

const OUTPUT_FILE_PATH = path.join("..", "public", "solutions-in-range.json");
const MIN_NUMBER_OF_STEPS = 14;
const MAX_NUMBER_OF_STEPS = 24;

async function main() {
    writeFileSync(
        OUTPUT_FILE_PATH,
        Object.entries(allMetroSolutions)
            .reduce<Array<string>>((acc, [from, solutionsFrom], index1) => {
                return [
                    ...acc,
                    ...Object.entries(solutionsFrom)
                        .reduce<Array<[string, string]>>((acc, [to, solution], index2) => {
                            if (
                                solution === null ||
                                solution.length < MIN_NUMBER_OF_STEPS ||
                                solution.length > MAX_NUMBER_OF_STEPS
                            ) {
                                return acc;
                            }

                            if (index1 < index2) {
                                return acc;
                            }

                            return [...acc, [from, to]];
                        }, [])
                        .map(([from, to]) => `["${from}", "${to}"],`),
                ];
            }, [])
            .join("\n    "),
    );
}

main();
