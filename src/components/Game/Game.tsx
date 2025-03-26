import { GuessForm } from "@/components/GuessForm/GuessForm";
import { GameGuesses } from "@/components/GameGuesses/GameGuesses";
import { MapboxMetroStations } from "@/lib/mapbox/components/Mapbox/MapboxMetroStations";
import { MAPBOX_PUBLIC_ACCESS_TOKEN } from "@/constants/env";
import { buildRandomMetroStationsPath } from "@/app/game/actions";
import { NewGameButton } from "@/components/NewGameButton/NewGameButton";
import { GameBoard } from "@/components/GameBoard/GameBoard";

export const Game = async () => {
    const path = await buildRandomMetroStationsPath();

    return (
        <>
            <div className="w-full max-w-screen-md">
                <MapboxMetroStations accessToken={MAPBOX_PUBLIC_ACCESS_TOKEN} />
            </div>
            <div className="w-full max-w-screen-md flex flex-col items-center">
                <GameBoard path={path} />
                <NewGameButton />
            </div>
        </>
    );
};
