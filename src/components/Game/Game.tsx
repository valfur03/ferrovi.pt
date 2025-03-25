import { metroGraph, metroStations, metroStationsList } from "@/data/metro-stations";
import { GuessForm } from "@/components/GuessForm/GuessForm";
import { GameGuesses } from "@/components/GameGuesses/GameGuesses";
import { getShortestPathFromAToB } from "@/lib/metro-graph";

export const Game = async () => {
    const from = Math.floor(Math.random() * metroStationsList.length);
    const to = (from + Math.floor(Math.random() * (metroStationsList.length - 1) + 1)) % metroStationsList.length;

    const solution = getShortestPathFromAToB(metroGraph, metroStationsList[from].id, metroStationsList[to].id);
    const path = solution.map(([, metroStation]) => {
        return metroStations[metroStation as keyof typeof metroStations];
    });

    return (
        <div className="flex flex-col sm:flex-row w-full sm:w-fit px-2 sm:px-0 gap-2">
            <GameGuesses />
            <GuessForm path={path} />
        </div>
    );
};
