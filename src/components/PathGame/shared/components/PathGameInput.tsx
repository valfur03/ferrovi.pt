import { SearchBar } from "@/components/SearchBar/SearchBar";
import { usePathGameContext } from "@/contexts/path-game/use-path-game-context";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { metroStationsList } from "@/data/metro-stations";
import { MetroStation } from "@/types/metro-station";
import { searchScore } from "@/utils/search";
import { PathGameTweetButton } from "@/components/PathGame/shared/components/PathGameTweetButton";
import { isCharacterKeyPress } from "@/utils/events/keyboard";

export const PathGameInput = () => {
    const inputBaseValue = "";
    const [inputValue, setInputValue] = useState(inputBaseValue);
    const {
        makeGuess,
        gameState: {
            current: { hasWon },
        },
    } = usePathGameContext();
    const searchBarRef = useRef<HTMLInputElement | null>(null);

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

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (searchBarRef.current !== null) {
                if (isCharacterKeyPress(e)) {
                    searchBarRef.current.focus();
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    return (
        <div className="w-full max-w-screen-sm">
            <SearchBar
                ref={searchBarRef}
                name="metro-station"
                placeholder="Entrez le nom d'une station"
                disabled={hasWon}
                aria-disabled={hasWon}
                value={inputValue}
                onChange={handleInputChange}
                onSearch={handleSearch}
                onValueChange={handleStationSelect}
            />
            {hasWon && (
                <div className="flex flex-col gap-4 p-4">
                    <p>Vous avez fini la partie d&apos;aujourd&apos;hui, revenez demain pour un nouveau challenge !</p>
                    <PathGameTweetButton />
                </div>
            )}
        </div>
    );
};
