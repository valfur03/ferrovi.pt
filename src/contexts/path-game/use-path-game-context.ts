import { useContext } from "react";
import { PathGameContext } from "@/contexts/path-game/path-game.context";
import { PathGameProvider } from "@/contexts/path-game/PathGameProvider";

export const usePathGameContext = () => {
    const context = useContext(PathGameContext);
    if (!context) {
        throw new Error(`${usePathGameContext.name} must be called from within a ${PathGameProvider.name}`);
    }
    return context;
};
