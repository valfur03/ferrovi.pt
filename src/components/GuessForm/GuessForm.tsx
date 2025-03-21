"use client";

import { ChangeEventHandler, FormEventHandler, useCallback, useState } from "react";
import { useGame } from "@/contexts/game/use-game";

export const GuessForm = () => {
    const inputBaseValue = "";
    const [inputValue, setInputValue] = useState(inputBaseValue);
    const { state, makeGuess } = useGame();

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setInputValue(e.target.value);
    }, []);

    const resetInput = useCallback(() => {
        setInputValue(inputBaseValue);
    }, []);

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = useCallback(
        (e) => {
            e.preventDefault();

            makeGuess(inputValue);
            resetInput();
        },
        [inputValue, makeGuess, resetInput],
    );

    return (
        <div>
            {state?.latestGuess && <p>Your latest guess was: {state.latestGuess}</p>}
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
