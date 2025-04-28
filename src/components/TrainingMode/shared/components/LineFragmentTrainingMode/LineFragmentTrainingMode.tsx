import { LineFragmentTrainingModeProvider } from "@/components/TrainingMode/shared/components/LineFragmentTrainingMode/shared/contexts/line-fragment-training-mode/LineFragmentTrainingModeProvider";
import { useLineFragmentTrainingMode } from "@/components/TrainingMode/shared/components/LineFragmentTrainingMode/shared/contexts/line-fragment-training-mode/use-line-fragment-training-mode";
import { MetroStation } from "@/types/metro-station";

export type LineFragmentTrainingModeProps = {
    from: MetroStation;
    to: MetroStation;
};

export const LineFragmentTrainingMode = ({ from, to }: LineFragmentTrainingModeProps) => {
    const game = useLineFragmentTrainingMode({ from, to });

    return <LineFragmentTrainingModeProvider {...game}></LineFragmentTrainingModeProvider>;
};
