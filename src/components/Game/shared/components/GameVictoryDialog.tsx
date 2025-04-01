"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/Button/Button";
import { useGame } from "@/contexts/game/use-game";
import { useCallback } from "react";
import { buildRandomMetroStationsPath } from "@/app/game/actions";

export const GameVictoryDialog = () => {
    const { hasWon, init } = useGame();

    const handleClick = useCallback(async () => {
        const newPath = await buildRandomMetroStationsPath();
        init({ path: newPath });
    }, [init]);

    return (
        <Dialog.Root open={hasWon}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80" />
                <Dialog.Content
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                    onEscapeKeyDown={(e) => {
                        e.preventDefault();
                    }}
                    onOpenAutoFocus={(e) => {
                        e.preventDefault();
                    }}
                    className="bg-white flex flex-col gap-6 items-center rounded-xl shadow-xl max-w-md w-4/5 fixed top-1/2 left-1/2 -translate-1/2 z-50 p-6 outline-none text-center"
                >
                    <Dialog.Title className="text-lg font-semibold">Vous avez gagné !</Dialog.Title>
                    <div>
                        <Button onClick={handleClick}>Rejouer</Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
