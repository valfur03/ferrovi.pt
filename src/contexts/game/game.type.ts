import { MetroStation } from "@/types/metro-station";

export type Game = {
    solution: [MetroStation, ...MetroStation[]];
    guesses: Array<MetroStation>;
};
