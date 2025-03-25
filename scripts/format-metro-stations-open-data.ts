#!/usr/bin/env ts-node

import { readFile } from "fs/promises";
import path from "node:path";
import { MetroStation } from "@/types/metro-station";
import { writeFile } from "node:fs/promises";
import { MetroLine } from "@/types/metro-line";

/**
 * JSON file may be downloaded from: https://data.iledefrance-mobilites.fr/explore/dataset/emplacement-des-gares-idf/information.
 */
const INPUT_FILE_PATH = path.join("..", "public", "metro.json");
const OUTPUT_FILE_PATH = path.join("..", "public", "out-metro.json");

export type InputStation = {
    geo_point_2d: {
        lon: number;
        lat: number;
    };
    mode: "METRO" | string;
    indice_lig: string;
    nom_gares: string;
};
export type OutputStation = MetroStation;

function slugFromName(name: string) {
    return name
        .normalize("NFD") // Decomposes accents
        .replace(/[̀-ͯ]/g, "") // Removes accents
        .replace(/[–-]/g, " ") // Replace hyphens (including long ones) with spaces
        .replace(/('|’)/g, " ") // Replace apostrophes with spaces
        .split(" ") // Split into words
        .map((word, index) =>
            index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        ) // CamelCase transformation
        .join("");
}

async function main() {
    const data = await readFile(INPUT_FILE_PATH)
        .then<Array<InputStation>>((buffer) => {
            return JSON.parse(buffer.toString());
        })
        .catch((error) => {
            console.error(error);
            return null;
        });

    if (data === null) {
        return process.exit(1);
    }

    const output = data.reduce<Record<string, OutputStation>>((acc, { geo_point_2d, mode, nom_gares, indice_lig }) => {
        if (mode === "METRO") {
            const stationName = slugFromName(nom_gares);
            const station = acc[stationName] ?? { name: nom_gares, line: [] };

            return {
                ...acc,
                [stationName]: {
                    ...station,
                    line: [...station.line, indice_lig as MetroLine],
                    coordinates: [geo_point_2d.lon, geo_point_2d.lat],
                },
            };
        }
        return acc;
    }, {});

    return writeFile(OUTPUT_FILE_PATH, JSON.stringify(output));
}

main();
