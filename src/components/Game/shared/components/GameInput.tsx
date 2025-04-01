import { SearchBar } from "@/components/SearchBar/SearchBar";
import { useGame } from "@/contexts/game/use-game";
import React, { useCallback, useState } from "react";
import { metroStationsList } from "@/data/metro-stations";
import { MetroStation } from "@/types/metro-station";
import { searchScore } from "@/utils/search";

export const GameInput = () => {
    const inputBaseValue = "";
    const [inputValue, setInputValue] = useState(inputBaseValue);
    const { makeGuess } = useGame();

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setInputValue(e.target.value);
    }, []);

    const handleSearch = useCallback((value: string) => {
        return metroStationsList
            .reduce<Array<[number, MetroStation]>>((acc, metroStation) => {
                const score = searchScore(metroStation.name, value, [
                    metroStation.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                ]);

                if (score === 0) {
                    return acc;
                }

                return [...acc, [score, metroStation]];
            }, [])
            .toSorted(([score1], [score2]) => score2 - score1)
            .slice(0, 5)
            .map(([, metroStation]) => metroStation.name);
    }, []);

    const resetInput = useCallback(() => {
        setInputValue(inputBaseValue);
    }, []);

    const handleStationSelect = useCallback(
        (value: string) => {
            if (makeGuess(value)) {
                resetInput();
            }
        },
        [makeGuess, resetInput],
    );

    return (
        <div className="w-full max-w-screen-sm">
            <SearchBar
                name="metro-station"
                placeholder="Porte des Lilas"
                value={inputValue}
                onChange={handleInputChange}
                onSearch={handleSearch}
                onValueChange={handleStationSelect}
            />
        </div>
    );
};
