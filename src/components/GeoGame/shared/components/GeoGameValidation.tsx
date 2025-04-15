"use client";

import { Button } from "@/components/Button/Button";
import { useGeoGame } from "@/contexts/geo-game/use-geo-game";
import { useCallback } from "react";
import * as React from "react";

export type GeoGameValidationProps = {
    mapPointSelection: { coordinates: [number, number] } | null;
};

export const GeoGameValidation = ({ mapPointSelection }: GeoGameValidationProps) => {
    const { makeGuess } = useGeoGame();

    const handleClick = useCallback(() => {
        if (mapPointSelection !== null) {
            makeGuess(mapPointSelection.coordinates);
        }
    }, [makeGuess, mapPointSelection]);

    return (
        <Button disabled={mapPointSelection === null} aria-disabled={mapPointSelection === null} onClick={handleClick}>
            Valider
        </Button>
    );
};
