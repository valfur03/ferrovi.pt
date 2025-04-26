import { MetroStation } from "@/types/metro-station";

export type GeoGameType = {
    current: {
        date: Date;
        solutions: Array<MetroStation>;
        currentStation: MetroStation | null;
        guesses: Array<[number, number]>;
        hasWon: boolean;
        stats: Array<number>;
        currentScore: number;
    };
    history: Array<{ date: Date; score: number | null }>;
};
