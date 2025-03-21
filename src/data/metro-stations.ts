import { MetroStation } from "@/types/metro-station";

export const createMetroStations = <T extends Record<string, MetroStation>>(stations: T) => stations;

export const metroStations = createMetroStations({
    chatelet: { name: "Châtelet", line: ["1", "4", "7", "11", "14"] },
    maubertMutualite: { name: "Maubert – Mutualité", line: ["10"] },
    porteDeClichy: { name: "Porte de Clichy", line: ["13", "14"] },
    porteDesLilas: { name: "Porte des Lilas", line: ["3bis", "11"] },
});
export const metroStationsList = Object.values(metroStations);
