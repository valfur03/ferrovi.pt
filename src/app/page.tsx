import { Game } from "@/components/Game/Game";
import { LogoLong } from "@/components/Logo/LogoLong";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col items-center">
            <div className="w-full bg-white flex p-4 flex items-center justify-center">
                <Link href="/">
                    <LogoLong className="w-32" />
                </Link>
            </div>
            <Game />
        </main>
    );
}

// As long as the path is generated here
export const dynamic = "force-dynamic";
