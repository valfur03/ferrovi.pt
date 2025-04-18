import React, { PropsWithChildren, useReducer } from "react";
import { PathGameContext, PathGameContextType } from "@/contexts/path-game/path-game.context";
import { PathGameAction, pathGameReducer } from "@/contexts/path-game/path-game.reducer";

export type GameProviderProps = PropsWithChildren<PathGameContextType>;

export const PathGameProvider = ({ children, ...props }: GameProviderProps) => {
    const [state, dispatch] = useReducer<PathGameContextType, [PathGameAction]>(pathGameReducer, props);

    return <PathGameContext.Provider value={state}>{children}</PathGameContext.Provider>;
};
