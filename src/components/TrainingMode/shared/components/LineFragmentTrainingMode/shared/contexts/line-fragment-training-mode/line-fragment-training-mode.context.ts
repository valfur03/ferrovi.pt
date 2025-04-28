import { createContext } from "react";
import { LineFragmentTrainingModeType } from "@/components/TrainingMode/shared/components/LineFragmentTrainingMode/shared/contexts/line-fragment-training-mode/line-fragment-training-mode.type";

export type LineFragmentTrainingModeContextType = {
    gameState: LineFragmentTrainingModeType;
    makeGuess: () => void;
};

export const LineFragmentTrainingModeContext = createContext<LineFragmentTrainingModeContextType | null>(null);
