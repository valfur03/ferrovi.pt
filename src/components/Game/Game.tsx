import { metroStations, metroStationsList } from "@/data/metro-stations";
import { GuessForm } from "@/components/GuessForm/GuessForm";
import { GameGuesses } from "@/components/GameGuesses/GameGuesses";

export const Game = async () => {
    const allMetroSolutions = await import("@/data/solutions.json");

    const from = Math.floor(Math.random() * metroStationsList.length);
    const to = (from + Math.floor(Math.random() * (metroStationsList.length - 1) + 1)) % metroStationsList.length;

    const solution = (allMetroSolutions as unknown as Record<string, Record<string, Array<[string | null, string]>>>)[
        metroStationsList[from].id
    ][metroStationsList[to].id];
    const path = solution.map(([, metroStation]) => {
        return metroStations[metroStation as keyof typeof metroStations];
    });

    return (
        <main className="flex flex-col md:flex-row gap-2">
            <GameGuesses />
            <GuessForm path={path} />
        </main>
    );
};
