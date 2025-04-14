"use client";

import { GameProblemStation } from "@/components/Game/shared/components/GameProblemStation";
import { useGame } from "@/contexts/game/use-game";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export const GameFromTo = () => {
    const { endpoints } = useGame();

    if (endpoints === null) {
        return null;
    }

    const [from, to] = endpoints;

    return (
        <div className="w-full sticky top-0 z-10 p-4 max-w-screen-md md:px-0 grid grid-cols-[1fr_calc(var(--spacing)*8)_1fr] justify-center items-center gap-3">
            <GameProblemStation>{from.name}</GameProblemStation>
            <ArrowRightIcon className="w-full h-full block stroke-12 [&>path]:stroke-inherit" />
            <GameProblemStation>{to.name}</GameProblemStation>
        </div>
    );
};
