import { Button } from "@/components/Button/Button";
import { useGeoGame } from "@/contexts/geo-game/use-geo-game";
import { useCallback } from "react";
import * as React from "react";

export type GeoGameValidationProps = {
    mapPointSelection: { coordinates: [number, number] } | null;
    resetMapPointSelection: () => void;
};

export const GeoGameValidation = ({ mapPointSelection, resetMapPointSelection }: GeoGameValidationProps) => {
    const { makeGuess, hasWon } = useGeoGame();

    const handleClick = useCallback(() => {
        if (mapPointSelection !== null) {
            makeGuess(mapPointSelection.coordinates);
            resetMapPointSelection();
        }
    }, [makeGuess, mapPointSelection, resetMapPointSelection]);

    if (hasWon) {
        return null;
    }

    return (
        <div className="absolute md:static bottom-4">
            <Button
                disabled={mapPointSelection === null}
                aria-disabled={mapPointSelection === null}
                variant="primary"
                className="min-w-32 min-h-10"
                onClick={handleClick}
            >
                Valider
            </Button>
        </div>
    );
};
