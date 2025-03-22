import { GuessForm } from "@/components/GuessForm/GuessForm";
import { metroStations, metroStationsList } from "@/data/metro-stations";
import allMetroSolutions from "@/data/solutions.json";

export default function Home() {
    const from = Math.floor(Math.random() * metroStationsList.length);
    const to = (from + Math.floor(Math.random() * (metroStationsList.length - 1) + 1)) % metroStationsList.length;

    const solution = (allMetroSolutions as Record<string, Record<string, Array<[string | null, string]>>>)[
        metroStationsList[from].id
    ][metroStationsList[to].id];
    const path = solution.map(([, metroStation]) => {
        return metroStations[metroStation as keyof typeof metroStations];
    });

    return (
        <>
            <GuessForm path={path} />
        </>
    );
}
