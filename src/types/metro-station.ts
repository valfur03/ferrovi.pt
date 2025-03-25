import { MetroLine } from "@/types/metro-line";

export type MetroStation = {
    id: string;
    name: string;
    line: [MetroLine, ...MetroLine[]];
    coordinates: [number, number];
};
