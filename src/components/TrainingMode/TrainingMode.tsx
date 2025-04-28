"use client";

import { LineFragmentTrainingMode } from "@/components/TrainingMode/shared/components/LineFragmentTrainingMode/LineFragmentTrainingMode";
import { metroStations } from "@/data/metro-stations";

export const TrainingMode = () => {
    return <LineFragmentTrainingMode from={metroStations.porteDesLilas} to={metroStations.jourdain} />;
};
