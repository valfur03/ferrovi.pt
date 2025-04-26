"use client";

import { PathGameProblemStation } from "@/components/PathGame/shared/components/PathGameProblemStation";
import { usePathGameContext } from "@/contexts/path-game/use-path-game-context";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export const PathGameFromTo = () => {
    const {
        gameState: {
            current: { endpoints },
        },
    } = usePathGameContext();

    if (endpoints === null) {
        return null;
    }

    const { from, to } = endpoints;

    return (
        <div className="w-full p-4 max-w-screen-md md:px-0 grid grid-cols-[1fr_calc(var(--spacing)*8)_1fr] justify-center items-center gap-3">
            <PathGameProblemStation>{from.name}</PathGameProblemStation>
            <ArrowRightIcon className="w-full h-full block stroke-12 [&>path]:stroke-inherit" />
            <PathGameProblemStation>{to.name}</PathGameProblemStation>
        </div>
    );
};
