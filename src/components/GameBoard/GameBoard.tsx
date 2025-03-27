"use client";

import { GameGuesses } from "@/components/GameGuesses/GameGuesses";
import { GuessForm } from "@/components/GuessForm/GuessForm";
import { MetroStation } from "@/types/metro-station";
import { useGame } from "@/contexts/game/use-game";
import { useEffect } from "react";

export type GameBoardProps = {
    path: Array<MetroStation>;
};

export const GameBoard = ({ path }: GameBoardProps) => {
    const { init, hasWon } = useGame();

    useEffect(() => {
        init({ path });
    }, [init, path]);

    return (
        <>
            {!hasWon ? (
                <div className="flex md:w-fit flex-col sm:flex-row w-full gap-2">
                    <GameGuesses />
                    <GuessForm />
                </div>
            ) : (
                <div>
                    <p>C&apos;est gagné !</p>
                </div>
            )}
        </>
    );
};
