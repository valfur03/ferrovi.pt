import { GAME_STARTING_DATE } from "@/constants/game";
import { TweetButton } from "@/components/TweetButton/TweetButton";
import { useGame } from "@/contexts/game/use-game";

export const GameTweetButton = () => {
    const { stats } = useGame();

    if (stats === null) {
        return null;
    }

    return (
        <TweetButton
            text={
                `#ferrovipathe jour ${
                    Math.floor((Date.now() - GAME_STARTING_DATE.getTime()) / (1000 * 60 * 60 * 24)) + 1
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
