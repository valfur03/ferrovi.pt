import { metroStationsList } from "@/data/metro-stations";

export const findMetroStationByName = (stationName: string) => {
    return metroStationsList.find(({ name }) => name === stationName);
};
