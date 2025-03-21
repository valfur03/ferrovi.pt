import { metroStationsList } from "@/data/metro-stations";

export const metroStationExists = (stationName: string) => {
    return metroStationsList.find(({ name }) => name === stationName);
};
