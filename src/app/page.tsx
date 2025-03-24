import { Game } from "@/components/Game/Game";
import { Suspense } from "react";
import { LoadingGame } from "@/components/Game/LoadingGame";
import { LogoLong } from "@/components/Logo/LogoLong";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col items-center">
            <Link href="/">
                <LogoLong className="w-32 my-4" />
            </Link>
            <Suspense fallback={<LoadingGame />}>
                <Game />
            </Suspense>
        </main>
    );
}

// As long as the path is generated here
export const dynamic = "force-dynamic";
