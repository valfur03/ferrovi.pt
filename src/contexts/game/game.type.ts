import { MetroStation } from "@/types/metro-station";

export type Game = {
    endpoints: [MetroStation, MetroStation];
    solution: [MetroStation, ...MetroStation[]];
    guesses: Array<MetroStation>;
};
