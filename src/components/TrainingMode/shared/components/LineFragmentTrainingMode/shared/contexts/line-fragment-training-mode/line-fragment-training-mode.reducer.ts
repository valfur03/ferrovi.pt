import { StaticLineFragmentTrainingModeType } from "@/components/TrainingMode/shared/components/LineFragmentTrainingMode/shared/contexts/line-fragment-training-mode/use-line-fragment-training-mode";

export type LineFragmentTrainingModeAction = { type: never; payload: never };

export const lineFragmentTrainingModeReducer = (
    state: StaticLineFragmentTrainingModeType,
    action: LineFragmentTrainingModeAction,
): StaticLineFragmentTrainingModeType => {
    switch (action.type) {
        default: {
            return state;
        }
    }
};
