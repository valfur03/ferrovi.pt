"use client";

import { ChangeEventHandler, FormEventHandler, useCallback, useState } from "react";

export const GuessForm = () => {
    const inputBaseValue = "";
    const [inputValue, setInputValue] = useState(inputBaseValue);

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setInputValue(e.target.value);
    }, []);

    const resetInput = useCallback(() => {
        setInputValue(inputBaseValue);
    }, []);

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = useCallback(
        (e) => {
            e.preventDefault();

            resetInput();
        },
        [resetInput],
    );

    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 w-64">
            <input value={inputValue} onChange={handleInputChange} placeholder="Porte des Lilas" className="border" />
            <button type="submit" className="bg-blue-200">
                Guess
            </button>
        </form>
    );
};
