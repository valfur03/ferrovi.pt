import { StaticPathGameType } from "@/contexts/path-game/use-path-game";
import { MetroStation } from "@/types/metro-station";
import { areDatesOnSameDay } from "@/utils/date";

export type PathGameAction =
    | { type: "ADD_GUESS"; payload: MetroStation }
    | { type: "SAVE_VICTORY"; payload: { date: Date } };

export const pathGameReducer = (state: StaticPathGameType, action: PathGameAction): StaticPathGameType => {
    switch (action.type) {
        case "ADD_GUESS": {
            if (state.current.discoveredStations.find(({ id }) => id === action.payload.id) !== undefined) {
                return state;
            }

            const onShortestPath = state.current.solution.find(({ id }) => id === action.payload.id) !== undefined;

            return {
                ...state,
                current: {
                    ...state.current,
                    discoveredStations: [
                        ...state.current.discoveredStations,
                        {
                            ...action.payload,
                            onShortestPath,
                        },
                    ],
                },
            };
        }
        case "SAVE_VICTORY": {
            if (state.history.find(({ date }) => areDatesOnSameDay(date, action.payload.date)) !== undefined) {
                return state;
            }

            return { ...state, history: [...state.history, { date: action.payload.date, hasWon: true }] };
        }
        default: {
            return state;
        }
    }
};
