#!/usr/bin/env ts-node

import { writeFileSync } from "node:fs";
import path from "node:path";
import { allMetroSolutions } from "@/data/solutions";

const OUTPUT_FILE_PATH = path.join("..", "public", "solutions.json");

async function main() {
    writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(allMetroSolutions, undefined, 2));
}

main();
