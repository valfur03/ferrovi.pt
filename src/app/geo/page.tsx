import { Navbar } from "@/components/Navbar/Navbar";
import { mapboxConfiguration } from "@/config/mapbox";
import { GeoGame } from "@/components/GeoGame/GeoGame";
import { metroStations } from "@/data/metro-stations";

export default function GeoGamePage() {
    return (
        <div className="min-h-dvh flex flex-col items-stretch">
            <Navbar />
            <main className="w-full h-0 flex flex-col items-center grow md:gap-12">
                <GeoGame mapboxConfiguration={mapboxConfiguration} solutions={[metroStations.mairieDesLilas]} />
            </main>
        </div>
    );
}
