import { GeoGame } from "@/contexts/geo-game/geo-game.type";
import { MetroStation } from "@/types/metro-station";

export type GeoGameAction =
    | { type: "INIT"; payload: { solutions: Array<MetroStation> } }
    | { type: "MAKE_GUESS"; payload: [number, number] };

export const geoGameReducer = (state: GeoGame | null, action: GeoGameAction): GeoGame | null => {
    switch (action.type) {
        case "INIT": {
            return {
                solutions: action.payload.solutions,
                guesses: [],
                hasPlayed: false,
            };
        }
        case "MAKE_GUESS": {
            if (state === null) {
                return state;
            }

            return { ...state, guesses: [...state.guesses, action.payload] };
        }
        default:
            return state;
    }
};
