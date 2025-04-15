import { Navbar } from "@/components/Navbar/Navbar";
import { mapboxConfiguration } from "@/config/mapbox";
import { GeoGame } from "@/components/GeoGame/GeoGame";
import { getGeoChallengeOfTheDay } from "@/utils/geo-game";

export default function GeoGamePage() {
    const solutions = getGeoChallengeOfTheDay();

    return (
        <div className="min-h-dvh flex flex-col items-stretch">
            <Navbar />
            <main className="w-full h-0 flex flex-col items-center grow md:gap-12">
                {solutions !== null ? (
                    <GeoGame mapboxConfiguration={mapboxConfiguration} solutions={solutions} />
                ) : (
                    <p>Le jeu n&apos;a pas encore commencé, revenez plus tard !</p>
                )}
            </main>
        </div>
    );
}

export const dynamic = "force-dynamic";
