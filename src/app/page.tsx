import { Game } from "@/components/Game/Game";
import { Suspense } from "react";
import { LoadingGame } from "@/components/Game/LoadingGame";

export default function Home() {
    return (
        <>
            <Suspense fallback={<LoadingGame />}>
                <Game />
            </Suspense>
        </>
    );
}

// As long as the path is generated here
export const dynamic = "force-dynamic";
