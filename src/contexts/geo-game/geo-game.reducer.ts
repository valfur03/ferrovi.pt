import { StaticGeoGameType } from "@/contexts/geo-game/use-geo-game";
import { areDatesOnSameDay } from "@/utils/date";
import { calculateGeoGameScore } from "@/utils/geo-game";

export type GeoGameAction =
    | { type: "ADD_GUESS"; payload: [number, number] }
    | { type: "SAVE_VICTORY"; payload: { date: Date } };

export const geoGameReducer = (state: StaticGeoGameType, action: GeoGameAction): StaticGeoGameType => {
    switch (action.type) {
        case "ADD_GUESS": {
            return {
                ...state,
                current: {
                    ...state.current,
                    guesses: [...state.current.guesses, action.payload],
                },
            };
        }
        case "SAVE_VICTORY": {
            if (state.history.find(({ date }) => areDatesOnSameDay(date, action.payload.date)) !== undefined) {
                return state;
            }

            return {
                ...state,
                history: [...state.history, { date: action.payload.date, score: calculateGeoGameScore(state.current) }],
            };
        }
        default: {
            return state;
        }
    }
};
