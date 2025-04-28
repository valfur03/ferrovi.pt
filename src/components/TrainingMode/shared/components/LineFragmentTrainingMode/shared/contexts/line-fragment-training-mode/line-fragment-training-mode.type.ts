import { MetroStation } from "@/types/metro-station";

export type LineFragmentTrainingModeType = {
    endpoints: Record<"from" | "to", MetroStation>;
};
