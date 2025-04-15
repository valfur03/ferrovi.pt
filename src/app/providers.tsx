import { PropsWithChildren } from "react";
import { GameProvider } from "@/contexts/game/GameProvider";
import { GeoGameProvider } from "@/contexts/geo-game/GeoGameProvider";

export type ProvidersProps = PropsWithChildren;

export const Providers = ({ children }: ProvidersProps) => {
    return (
        <>
            <GameProvider>
                <GeoGameProvider>{children}</GeoGameProvider>
            </GameProvider>
        </>
    );
};
