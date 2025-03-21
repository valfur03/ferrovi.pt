"use client";

import { ChangeEventHandler, FormEventHandler, useCallback, useEffect, useState } from "react";
import { useGame } from "@/contexts/game/use-game";

export const GuessForm = () => {
    const inputBaseValue = "";
    const [inputValue, setInputValue] = useState(inputBaseValue);
    const { state, init, makeGuess, latestGuess } = useGame();

    useEffect(() => {
        init();
    }, [init]);

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setInputValue(e.target.value);
    }, []);

    const resetInput = useCallback(() => {
        setInputValue(inputBaseValue);
    }, []);

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = useCallback(
        (e) => {
            e.preventDefault();

            if (makeGuess(inputValue)) {
                resetInput();
            }
        },
        [inputValue, makeGuess, resetInput],
    );

    return (
        <div>
            {latestGuess && <p>Your latest guess was: {latestGuess.name}</p>}
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 w-64">
                <input
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Porte des Lilas"
                    className="border"
                />
                <button type="submit" className="bg-blue-200">
                    Guess
                </button>
            </form>
        </div>
    );
};
