"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useGame } from "@/contexts/game/use-game";
import { Button } from "@/components/Button/Button";
import { useEffect, useState } from "react";

export const GameVictoryDialog = () => {
    const { hasWon, hasPlayed } = useGame();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsOpen(hasWon && hasPlayed);
        }, 1000);
    }, [hasWon, hasPlayed]);

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80" />
                <Dialog.Content className="bg-white flex flex-col gap-6 items-center rounded-xl shadow-xl max-w-md w-4/5 fixed top-1/2 left-1/2 -translate-1/2 z-50 p-6 outline-none text-center">
                    <Dialog.Title className="text-lg font-semibold">Vous avez gagné !</Dialog.Title>
                    <Dialog.Close asChild>
                        <Button aria-label="Close">Fermer</Button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
