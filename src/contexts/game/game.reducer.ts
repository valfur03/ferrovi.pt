import { Game } from "@/contexts/game/game.type";
import { metroStations } from "@/data/metro-stations";
import { MetroStation } from "@/types/metro-station";

export type GameAction =
    | { type: "INIT"; payload: { path: Array<MetroStation> } }
    | { type: "MAKE_GUESS"; payload: MetroStation };

export const gameReducer = (state: Game | null, action: GameAction): Game | null => {
    switch (action.type) {
        case "INIT": {
            return {
                endpoints: [metroStations.chatelet, metroStations.mairieDesLilas],
                solution: action.payload.path,
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
