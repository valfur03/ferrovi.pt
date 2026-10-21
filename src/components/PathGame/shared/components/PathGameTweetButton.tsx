import { GAME_STARTING_DATE } from "@/constants/game";
import { TweetButton } from "@/components/TweetButton/TweetButton";
import { usePathGameContext } from "@/contexts/path-game/use-path-game-context";

export const PathGameTweetButton = () => {
    const {
        gameState: {
            current: { date, stats },
        },
    } = usePathGameContext();

    return (
        <TweetButton
            text={
                `#ferrovipathe jour ${
                    Math.floor((date.getTime() - GAME_STARTING_DATE.getTime()) / (1000 * 60 * 60 * 24)) + 1
                }` +
                "\n" +
                Object.values(stats)
                    .map(({ value, label, isBest }) => `${isBest ? "🟩" : "⬛"} ${value} ${label}`)
                    .join("\n") +
                "\n" +
                "ferrovi.pt"
            }
            className="w-full"
        >
            Partager mon score sur X
        </TweetButton>
    );
};
