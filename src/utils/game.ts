import { GAME_STARTING_DATE } from "@/constants/game";
import { getFeistelRandomNumber } from "@/lib/feistel-rng";
import { allDailyMetroProblems, metroGraph, metroStations } from "@/data/metro-stations";
import { getShortestPathFromAToB } from "@/lib/metro-graph";

export const getPathChallengeOfTheDay = (date: Date = new Date()) => {
    const nthDay = Math.floor((date.getTime() - GAME_STARTING_DATE.getTime()) / (1000 * 60 * 60 * 24));

    if (nthDay < 0) {
        return null;
    }

    const randomPathIndex = getFeistelRandomNumber(nthDay, 0, (allDailyMetroProblems.length - 1) * 2);
    const pathIndex = Math.floor(randomPathIndex / 2);
    const reversePath = randomPathIndex % 2 !== 0;

    const [fromStr, toStr] = allDailyMetroProblems[pathIndex] as [
        keyof typeof metroStations,
        keyof typeof metroStations,
    ];
    const from = metroStations[reversePath ? toStr : fromStr];
    const to = metroStations[reversePath ? fromStr : toStr];

    return getShortestPathFromAToB(metroGraph, from.id, to.id).map(([, metroStation]) => {
        return metroStations[metroStation as keyof typeof metroStations];
    });
};
