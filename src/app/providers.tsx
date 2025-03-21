import { PropsWithChildren } from "react";
import { GameProvider } from "@/contexts/game/GameProvider";

export type ProvidersProps = PropsWithChildren;

export const Providers = ({ children }: ProvidersProps) => {
    return (
        <>
            <GameProvider>{children}</GameProvider>
        </>
    );
};
