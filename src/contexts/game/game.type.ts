import { MetroStation } from "@/types/metro-station";

export type Game = {
    endpoints: [MetroStation, MetroStation];
    solution: Array<MetroStation>;
    guesses: Array<MetroStation>;
};
