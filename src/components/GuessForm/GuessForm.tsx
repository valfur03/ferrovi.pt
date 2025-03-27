"use client";

import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { useGame } from "@/contexts/game/use-game";
import { useId } from "@radix-ui/react-id";
import { metroStationsList } from "@/data/metro-stations";
import { MetroStation } from "@/types/metro-station";
import { searchScore } from "@/utils/search";

export const GuessForm = () => {
    const inputId = useId();
    const inputBaseValue = "";
    const [inputValue, setInputValue] = useState(inputBaseValue);
    const { makeGuess } = useGame();

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

    const [searchResults, setSearchResults] = useState<Array<MetroStation>>([]);
    const [selectedSearchResultIndex, setSelectedSearchResultIndex] = useState(0);
    const [selectedSearchResultId, setSelectedSearchResultId] = useState(searchResults[selectedSearchResultIndex]?.id);

    useEffect(() => {
        setSelectedSearchResultId(searchResults[selectedSearchResultIndex]?.id);
    }, [searchResults, selectedSearchResultIndex]);

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setInputValue(e.target.value);

        if (e.target.value === "") {
            return;
        }

        const newSearchResults = metroStationsList
            .reduce<Array<[number, MetroStation]>>((acc, metroStation) => {
                const score = searchScore(metroStation.name, e.target.value, [
                    metroStation.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                ]);

                if (score === 0) {
                    return acc;
                }

                return [...acc, [score, metroStation]];
            }, [])
            .toSorted(([score1], [score2]) => score2 - score1)
            .slice(0, 5)
            .map(([, metroStation]) => metroStation);
        setSearchResults(newSearchResults);
        setSelectedSearchResultId(newSearchResults[0]?.id);
        setSelectedSearchResultIndex(0);
    }, []);

    return (
        <div className="absolute bottom-0 left-0 w-full md:static">
            <div className="relative group">
                <div className="peer">
                    <input
                        id={inputId}
                        autoFocus={true}
                        name="metro-station"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            switch (e.key) {
                                case "ArrowDown": {
                                    return setSelectedSearchResultIndex((index) =>
                                        index < searchResults.length - 1 ? index + 1 : index,
                                    );
                                }
                                case "ArrowUp": {
                                    return setSelectedSearchResultIndex((index) => (index > 0 ? index - 1 : index));
                                }
                                case "Enter": {
                                    return handleStationSelect(searchResults[selectedSearchResultIndex].name);
                                }
                            }
                        }}
                        placeholder="Porte des Lilas"
                        className="outline-none bg-white border w-full p-2"
                    />
                </div>
                <div className="absolute z-10 w-full bottom-full bg-white p-4 hidden group-focus-within:block peer-[:has(>input:placeholder-shown)]:hidden">
                    {searchResults.map(({ id, name }) => (
                        <p
                            key={id}
                            aria-selected={id === selectedSearchResultId}
                            data-selected={id === selectedSearchResultId}
                            onMouseEnter={() => {
                                setSelectedSearchResultId(id);
                            }}
                            onMouseDown={() => {
                                handleStationSelect(name);
                            }}
                            className="data-[selected=true]:outline"
                        >
                            {name}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};
