import { PathGame } from "@/components/PathGame/PathGame";
import { Navbar } from "@/components/Navbar/Navbar";
import { mapboxConfiguration } from "@/config/mapbox";
import { getPathChallengeOfTheDay } from "@/utils/game";

export default async function Home() {
    const path = getPathChallengeOfTheDay();

    return (
        <div className="min-h-dvh flex flex-col items-stretch">
            <Navbar />
            <main className="w-full h-0 flex flex-col items-center grow md:gap-12">
                {path !== null ? (
                    <PathGame {...path} mapboxConfiguration={mapboxConfiguration} />
                ) : (
                    <p>Le jeu n&apos;a pas encore commencé, revenez plus tard !</p>
                )}
            </main>
        </div>
    );
}

// As long as the path is generated here
export const dynamic = "force-dynamic";
