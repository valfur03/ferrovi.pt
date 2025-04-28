import {
    LineFragmentTrainingModeContext,
    LineFragmentTrainingModeContextType,
} from "@/components/TrainingMode/shared/components/LineFragmentTrainingMode/shared/contexts/line-fragment-training-mode/line-fragment-training-mode.context";
import { PropsWithChildren } from "react";

export type LineFragmentTrainingModeProviderProps = PropsWithChildren<LineFragmentTrainingModeContextType>;

export const LineFragmentTrainingModeProvider = ({ children, ...props }: LineFragmentTrainingModeProviderProps) => {
    return <LineFragmentTrainingModeContext value={props}>{children}</LineFragmentTrainingModeContext>;
};
