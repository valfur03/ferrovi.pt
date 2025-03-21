import { MetroLine } from "@/types/metro-line";

export type MetroStation = {
    name: string;
    line: [MetroLine, ...MetroLine[]];
};
