import { metroGraph, metroStations, metroStationsList } from "@/data/metro-stations";
import { GuessForm } from "@/components/GuessForm/GuessForm";
import { GameGuesses } from "@/components/GameGuesses/GameGuesses";
import { MapboxMetroStations } from "@/lib/mapbox/components/Mapbox/MapboxMetroStations";
import { MAPBOX_PUBLIC_ACCESS_TOKEN } from "@/constants/env";
import { buildRandomMetroStationsPath } from "@/app/game/actions";

export const Game = async () => {
    const path = await buildRandomMetroStationsPath();

    return (
        <>
            <div className="w-full max-w-screen-md">
                <MapboxMetroStations accessToken={MAPBOX_PUBLIC_ACCESS_TOKEN} />
            </div>
            <div className="w-full max-w-md">
                <div className="flex flex-col sm:flex-row w-full sm:w-fit px-2 sm:px-0 gap-2">
                    <GameGuesses />
                    <GuessForm path={path} />
                </div>
            </div>
        </>
    );
};
