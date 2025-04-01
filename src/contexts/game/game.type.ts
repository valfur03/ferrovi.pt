import { MetroStation } from "@/types/metro-station";

export type Game = {
    hasPlayed: boolean;
    endpoints: [MetroStation, MetroStation];
    solution: Array<MetroStation>;
    guesses: Array<MetroStation>;
};
