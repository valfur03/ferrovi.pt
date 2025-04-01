import { metroStationsList } from "@/data/metro-stations";

export const findMetroStationById = (stationId: string) => {
    return metroStationsList.find(({ id }) => id === stationId);
};

export const findMetroStationByName = (stationName: string) => {
    return metroStationsList.find(({ name }) => name === stationName);
};
