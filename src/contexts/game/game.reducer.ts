import { Game } from "@/contexts/game/game.type";
import { MetroStation } from "@/types/metro-station";

export type GameAction =
    | { type: "INIT"; payload: { path: Array<MetroStation>; guesses?: Array<MetroStation> } }
    | { type: "ADD_GUESS"; payload: MetroStation };

export const gameReducer = (state: Game | null, action: GameAction): Game | null => {
    switch (action.type) {
        case "INIT": {
            return {
                hasPlayed: false,
                endpoints: [action.payload.path[0], action.payload.path[action.payload.path.length - 1]],
                solution: action.payload.path.slice(1, -1),
                guesses: action.payload.guesses ?? [],
            };
        }
        case "ADD_GUESS": {
            if (state === null) {
                return null;
            }

            return { ...state, hasPlayed: true, guesses: state.guesses.concat(action.payload) };
        }
        default:
            return state;
    }
};
