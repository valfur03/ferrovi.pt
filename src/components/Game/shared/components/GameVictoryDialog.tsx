"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useGame } from "@/contexts/game/use-game";
import { Button } from "@/components/Button/Button";
import React, { useEffect, useState } from "react";
import { TweetButton } from "@/components/TweetButton/TweetButton";

export const GameVictoryDialog = () => {
    const { hasWon, hasPlayed, stats } = useGame();
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
                    {stats !== null && (
                        <>
                            <div className="grid grid-cols-3 gap-3">
                                {Object.values(stats).map(({ value, label, isBest }) => (
                                    <div
                                        className="grid grid-rows-2 rounded-lg p-2 group data-[is-best=false]:border-4 data-[is-best=false]:rounded-xl border-dotted border-neutral-600 data-[is-best=true]:bg-emerald-700 data-[is-best=true]:text-white"
                                        data-is-best={isBest}
                                        key={label}
                                    >
                                        <p className="font-bold text-2xl">{value}</p>
                                        <p className="text-xs group-data-[is-best=true]:text-neutral-100 text-neutral-600">
                                            {label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    <div className="flex flex-col gap-3 w-full">
                        {stats !== null && (
                            <TweetButton
                                text={
                                    "#ferrovipathe jour 42\n" +
                                    "\n" +
                                    Object.values(stats)
                                        .map(({ value, label, isBest }) => `${isBest ? "🟩" : "⬛"} ${value} ${label}`)
                                        .join("\n")
                                }
                                className="w-full"
                            >
                                Partager mon score sur X
                            </TweetButton>
                        )}
                        <Dialog.Close asChild>
                            <Button className="w-full" aria-label="Close">
                                Fermer
                            </Button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
