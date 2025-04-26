import React, { PropsWithChildren } from "react";
import { PathGameContext, PathGameContextType } from "@/contexts/path-game/path-game.context";

export type GameProviderProps = PropsWithChildren<PathGameContextType>;

export const PathGameProvider = ({ children, ...props }: GameProviderProps) => {
    if (!props.isReady) {
        return null;
    }

    return <PathGameContext.Provider value={props}>{children}</PathGameContext.Provider>;
};
