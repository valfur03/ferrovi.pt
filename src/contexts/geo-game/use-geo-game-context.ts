import { useContext } from "react";
import { GeoGameContext } from "@/contexts/geo-game/geo-game.context";
import { GeoGameProvider } from "@/contexts/geo-game/GeoGameProvider";

export const useGeoGameContext = () => {
    const context = useContext(GeoGameContext);
    if (!context) {
        throw new Error(`${useGeoGameContext.name} must be called from within a ${GeoGameProvider.name}`);
    }
    return context;
};
