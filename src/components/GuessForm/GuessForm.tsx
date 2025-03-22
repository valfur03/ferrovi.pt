"use client";

import { useCallback, useEffect, useState } from "react";
import { useGame } from "@/contexts/game/use-game";
import { Command, CommandInput } from "cmdk";
import { metroStationsList } from "@/data/metro-stations";

export const GuessForm = () => {
    const inputBaseValue = "";
    const [inputValue, setInputValue] = useState(inputBaseValue);
    const { init, makeGuess, latestGuess, discoveredPath, endpoints } = useGame();

    useEffect(() => {
        init();
    }, [init]);

    const handleInputChange = useCallback((value: string) => {
        setInputValue(value);
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
        <div>
            {latestGuess && <p>Your latest guess was: {latestGuess.name}</p>}
            <div className="relative group">
                <Command>
                    <CommandInput
                        value={inputValue}
                        onValueChange={handleInputChange}
                        placeholder="Porte des Lilas"
                        className="border peer"
                    />
                    <div className="absolute top-full bg-white p-4 hidden group-focus-within:block peer-placeholder-shown:hidden">
                        <Command.List>
                            {metroStationsList.map(({ id, name }) => (
                                <Command.Item
                                    key={id}
                                    keywords={[name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")]}
                                    onSelect={handleStationSelect}
                                    className="data-[selected=true]:outline"
                                >
                                    {name}
                                </Command.Item>
                            ))}
                        </Command.List>
                    </div>
                </Command>
            </div>
            {discoveredPath !== null && endpoints !== null && (
                <ol>
                    <li>{endpoints[0].name}</li>
                    {discoveredPath.map((station, index) => (
                        <li key={station?.id ?? index}>{station !== null ? station.name : "??"}</li>
                    ))}
                    <li>{endpoints[1].name}</li>
                </ol>
            )}
        </div>
    );
};
