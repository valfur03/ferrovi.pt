import { MetroStation } from "@/types/metro-station";

const createMetroStations = <T extends Record<string, Omit<MetroStation, "id">>>(
    stations: T,
): Record<keyof T, MetroStation> => {
    return Object.fromEntries(Object.entries(stations).map(([key, value]) => [key, { ...value, id: key }])) as Record<
        keyof T,
        MetroStation
    >;
};
export const metroStations = createMetroStations({
    chatelet: { name: "Châtelet", line: ["1", "4", "7", "11", "14"] },
    maubertMutualite: { name: "Maubert – Mutualité", line: ["10"] },
    porteDeClichy: { name: "Porte de Clichy", line: ["13", "14"] },
    porteDesLilas: { name: "Porte des Lilas", line: ["3bis", "11"] },
});
export const metroStationsList = Object.values(metroStations);
