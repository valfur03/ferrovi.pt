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
