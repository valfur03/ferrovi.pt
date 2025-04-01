import { Game } from "@/components/Game/Game";
import { Navbar } from "@/components/Navbar/Navbar";
import { buildRandomMetroStationsPath } from "@/app/game/actions";
import { mapboxConfiguration } from "@/config/mapbox";

export default async function Home() {
    const path = await buildRandomMetroStationsPath();

    return (
        <div className="min-h-screen flex flex-col items-stretch">
            <Navbar />
            <main className="w-full h-0 flex flex-col items-center grow md:gap-12">
                <Game path={path} mapboxConfiguration={mapboxConfiguration} />
            </main>
        </div>
    );
}

// As long as the path is generated here
export const dynamic = "force-dynamic";
