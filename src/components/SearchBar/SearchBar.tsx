"use client";

import React, { ChangeEventHandler, Ref, useCallback, useEffect, useRef, useState } from "react";

export type SearchBarProps = React.InputHTMLAttributes<HTMLInputElement> & {
    ref?: Ref<HTMLInputElement>;
    onSearch?: (value: string) => Array<string>;
    onValueChange?: (value: string) => void;
};

export const SearchBar = ({ onChange, onSearch, onValueChange, ref, value: propValue, ...props }: SearchBarProps) => {
    const [value, setValue] = useState(propValue ?? "");
    const [searchResults, setSearchResults] = useState<{ selectedIndex: number; t: Array<string> }>({
        selectedIndex: 0,
        t: [],
    });
    const localRef = useRef<HTMLInputElement>(null);
    const inputRef = ref ?? localRef;

    useEffect(() => {
        setValue(propValue ?? "");
    }, [propValue]);

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        (e) => {
            setValue(e.target.value);

            if (onSearch !== undefined) {
                const newSearchResults = onSearch(e.currentTarget.value);
                setSearchResults({
                    selectedIndex: 0,
                    t: newSearchResults,
                });
            }

            if (onChange !== undefined) {
                return onChange(e);
            }
        },
        [onSearch, onChange],
    );

    const handleValueSelect = useCallback(
        (value: string) => {
            if (onValueChange !== undefined) {
                onValueChange(value);
            }
        },
        [onValueChange],
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case "ArrowDown": {
                return setSearchResults((prev) => ({
                    ...prev,
                    selectedIndex: prev.selectedIndex < prev.t.length - 1 ? prev.selectedIndex + 1 : prev.selectedIndex,
                }));
            }
            case "ArrowUp": {
                return setSearchResults((prev) => ({
                    ...prev,
                    selectedIndex: prev.selectedIndex > 0 ? prev.selectedIndex - 1 : prev.selectedIndex,
                }));
            }
            case "Enter": {
                if (onValueChange === undefined) {
                    return;
                }

                const selectedValue = searchResults.t[searchResults.selectedIndex];
                if (selectedValue === undefined) {
                    throw new Error("index cannot point to undefined array element");
                }

                return onValueChange(selectedValue);
            }
        }
    };

    return (
        <div className="h-10 relative group w-full">
            <div className="absolute z-10 bg-white bottom-0 max-md:overflow-hidden w-full flex flex-col-reverse max-md:shadow-t-xl max-md:rounded-t-xl">
                <div className="peer w-full">
                    <input
                        {...props}
                        ref={inputRef}
                        autoFocus={true}
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        className="outline-none w-full p-3 disabled:bg-neutral-100  border-neutral-200 disabled:border"
                    />
                </div>
                <div className="w-full md:shadow-t-xl md:rounded-t-xl md:overflow-hidden h-fit hidden group-focus-within:block peer-[:has(>input:placeholder-shown)]:hidden">
                    {searchResults.t.map((value, index) => (
                        <p
                            key={value}
                            aria-selected={index === searchResults.selectedIndex}
                            data-selected={index === searchResults.selectedIndex}
                            onMouseEnter={() => {
                                setSearchResults((prev) => ({ ...prev, selectedIndex: index }));
                            }}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleValueSelect(value);
                            }}
                            className="data-[selected=true]:bg-neutral-100 px-4 py-2 cursor-pointer"
                        >
                            {value}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};
