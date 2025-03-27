import { MapboxMetroStations } from "@/lib/mapbox/components/Mapbox/MapboxMetroStations";
import { MAPBOX_PUBLIC_ACCESS_TOKEN } from "@/constants/env";
import { buildRandomMetroStationsPath } from "@/app/game/actions";
import { NewGameButton } from "@/components/NewGameButton/NewGameButton";
import { GameBoard } from "@/components/GameBoard/GameBoard";

export const Game = async () => {
    const path = await buildRandomMetroStationsPath();

    return (
        <>
            <div className="bg-white w-full md:max-w-screen-md flex flex-col items-center p-4">
                <GameBoard path={path} />
                <NewGameButton />
            </div>
            <div className="absolute -z-10 w-screen h-screen md:static md:z-0 md:max-w-screen-md md:w-full md:h-[inherit] md:aspect-[5/4] lg:aspect-[3/2]">
                <MapboxMetroStations accessToken={MAPBOX_PUBLIC_ACCESS_TOKEN} />
            </div>
        </>
    );
};
