export type GameModes = "path" | "geo";

export const getGameModeLocalStorageKey = (mode: GameModes) => {
    switch (mode) {
        case "path": {
            return "game";
        }
        case "geo": {
            return "geo-game";
        }
        default: {
            return `game-mode:${mode}`;
        }
    }
};
