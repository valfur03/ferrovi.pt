import { MetroStation } from "@/types/metro-station";

export const metroStations: Record<string, MetroStation> = {
    chatelet: { name: "Châtelet", line: ["1", "4", "7", "11", "14"] },
    maubertMutualite: { name: "Maubert – Mutualité", line: ["10"] },
    porteDeClichy: { name: "Porte de Clichy", line: ["13", "14"] },
    porteDesLilas: { name: "Porte des Lilas", line: ["3bis", "11"] },
};
export const metroStationsList = Object.values(metroStations);
