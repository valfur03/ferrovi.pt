import { LineFragmentTrainingModeContextType } from "@/components/TrainingMode/shared/components/LineFragmentTrainingMode/shared/contexts/line-fragment-training-mode/line-fragment-training-mode.context";
import { useCallback, useReducer } from "react";
import { MetroStation } from "@/types/metro-station";
import { LineFragmentTrainingModeType } from "@/components/TrainingMode/shared/components/LineFragmentTrainingMode/shared/contexts/line-fragment-training-mode/line-fragment-training-mode.type";
import { lineFragmentTrainingModeReducer } from "@/components/TrainingMode/shared/components/LineFragmentTrainingMode/shared/contexts/line-fragment-training-mode/line-fragment-training-mode.reducer";

export type StaticLineFragmentTrainingModeType = Omit<LineFragmentTrainingModeType, "hasWon">;

export type UseLineFragmentTrainingModeOptions = {
    from: MetroStation;
    to: MetroStation;
};

export const initGameState = ({ from, to }: UseLineFragmentTrainingModeOptions): StaticLineFragmentTrainingModeType => {
    return {
        endpoints: {
            from,
            to,
        },
    };
};

export const useLineFragmentTrainingMode = (
    options: UseLineFragmentTrainingModeOptions,
): LineFragmentTrainingModeContextType => {
    const [state, dispatch] = useReducer(lineFragmentTrainingModeReducer, options, initGameState);

    const makeGuess = useCallback(() => {}, []);

    return {
        gameState: {
            ...state,
        },
        makeGuess,
    };
};
