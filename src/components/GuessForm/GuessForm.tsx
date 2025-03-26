"use client";

import { useCallback, useState } from "react";
import { useGame } from "@/contexts/game/use-game";
import { Command, CommandInput } from "cmdk";
import { metroStationsList } from "@/data/metro-stations";
import { useId } from "@radix-ui/react-id";

export const GuessForm = () => {
    const inputId = useId();
    const inputBaseValue = "";
    const [inputValue, setInputValue] = useState(inputBaseValue);
    const { makeGuess } = useGame();

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
        <div className="relative group">
            <Command>
                <div className="peer">
                    <CommandInput
                        id={inputId}
                        autoFocus={true}
                        name="metro-station"
                        value={inputValue}
                        onValueChange={handleInputChange}
                        placeholder="Porte des Lilas"
                        className="border"
                    />
                </div>
                <div className="absolute top-full bg-white p-4 hidden group-focus-within:block peer-[:has(>input:placeholder-shown)]:hidden">
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
    );
};
