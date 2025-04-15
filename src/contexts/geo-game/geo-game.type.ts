import { MetroStation } from "@/types/metro-station";

export type GeoGame = {
    hasPlayed: boolean;
    guesses: Array<[number, number]>;
    solutions: Array<MetroStation>;
};
