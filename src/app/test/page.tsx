"use client";

import { useGameStorage } from "@/hooks/use-game-storage";

export default function TestPage() {
    const { save } = useGameStorage();

    return (
        <ul>
            {save.victoriesHistory.map((value) => (
                <li key={value}>{value}</li>
            ))}
        </ul>
    );
}
