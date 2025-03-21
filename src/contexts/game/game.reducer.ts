import { Game } from "@/contexts/game/game.type";

export type GameAction = { type: "INIT" } | { type: "MAKE_GUESS"; payload: string };

export const gameReducer = (state: Game | null, action: GameAction): Game | null => {
    switch (action.type) {
        case "INIT": {
            return { latestGuess: null };
        }
        case "MAKE_GUESS": {
            if (state === null) {
                return null;
            }

            return { ...state, latestGuess: action.payload };
        }
        default:
            return state;
    }
};
