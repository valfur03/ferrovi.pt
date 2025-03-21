import { useContext } from "react";
import { GameContext } from "@/contexts/game/game.context";
import { GameProvider } from "@/contexts/game/GameProvider";

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error(`${useGame.name} must be called from within a ${GameProvider.name}`);
    }
    return context;
};
