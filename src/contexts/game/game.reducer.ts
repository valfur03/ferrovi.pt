import { Game } from "@/contexts/game/game.type";
import { MetroStation } from "@/types/metro-station";

export type GameAction =
    | { type: "INIT"; payload: { path: Array<MetroStation> } }
    | { type: "MAKE_GUESS"; payload: MetroStation };

export const gameReducer = (state: Game | null, action: GameAction): Game | null => {
    switch (action.type) {
        case "INIT": {
            return {
                endpoints: [action.payload.path[0], action.payload.path[action.payload.path.length - 1]],
                solution: action.payload.path.slice(1, -1),
                guesses: [],
            };
        }
        case "MAKE_GUESS": {
            if (state === null) {
                return null;
            }

            return { ...state, guesses: state.guesses.concat(action.payload) };
        }
        default:
            return state;
    }
};
