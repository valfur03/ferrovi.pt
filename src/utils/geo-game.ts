import { GEO_GAME_STARTING_DATE } from "@/constants/geo-game";
import { getFeistelRandomNumber } from "@/lib/feistel-rng";
import { metroStationsList } from "@/data/metro-stations";
import { StaticGeoGameType } from "@/contexts/geo-game/use-geo-game";
import { haversineDistance } from "@/utils/coordinates";

export const getGeoChallengeOfTheDay = (date: Date = new Date()) => {
    const nthDay = Math.floor((date.getTime() - GEO_GAME_STARTING_DATE.getTime()) / (1000 * 60 * 60 * 24));

    if (nthDay < 0) {
        return null;
    }

    const seed = getFeistelRandomNumber(nthDay, 0, metroStationsList.length * metroStationsList.length);
    const [rand1, rand2, rand3] = [
        getFeistelRandomNumber(seed, 0, metroStationsList.length),
        getFeistelRandomNumber(seed + 1, 0, metroStationsList.length),
        getFeistelRandomNumber(seed + 2, 0, metroStationsList.length),
    ];

    return [metroStationsList[rand1], metroStationsList[rand2], metroStationsList[rand3]];
};

export function calculateScore(distanceInKm: number): number {
    const maxDistance = 3;
    const minDistance = 0.12;
    const maxScore = 1000;

    if (distanceInKm <= minDistance) {
        return maxScore;
    }

    if (distanceInKm >= maxDistance) {
        return 0;
    }

    const normalized = Math.log(maxDistance / distanceInKm) / Math.log(maxDistance / minDistance);
    return Math.round(maxScore * normalized);
}

export const getGeoGameScores = ({
    guesses,
    solutions,
}: Pick<StaticGeoGameType["current"], "guesses" | "solutions">) => {
    return solutions.map(({ coordinates }, index) => {
        const guessCoordinates = guesses.at(index);

        if (guessCoordinates === undefined) {
            return 0;
        }

        const [lon1, lat1] = coordinates;
        const [lon2, lat2] = guessCoordinates;
        const distance = haversineDistance(lat1, lon1, lat2, lon2);

        return calculateScore(distance);
    });
};

export const sumGeoGameScores = (scores: Array<number>) => scores.reduce((acc, score) => acc + score, 0);

export const calculateGeoGameScore = (gameState: Pick<StaticGeoGameType["current"], "guesses" | "solutions">) => {
    return sumGeoGameScores(getGeoGameScores(gameState));
};
