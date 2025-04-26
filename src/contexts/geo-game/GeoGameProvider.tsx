import React, { PropsWithChildren } from "react";
import { GeoGameContext, GeoGameContextType } from "@/contexts/geo-game/geo-game.context";

export type GameProviderProps = PropsWithChildren<GeoGameContextType>;

export const GeoGameProvider = ({ children, ...props }: GameProviderProps) => {
    if (!props.isReady) {
        return null;
    }

    return <GeoGameContext.Provider value={props}>{children}</GeoGameContext.Provider>;
};
