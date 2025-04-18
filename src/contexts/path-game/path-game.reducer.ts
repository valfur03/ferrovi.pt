import { PathGameContextType } from "@/contexts/path-game/path-game.context";

export type PathGameAction = Record<"type" | "payload", never>;

export const pathGameReducer = (state: PathGameContextType, action: PathGameAction): PathGameContextType => {
    switch (action.type) {
        default: {
            return state;
        }
    }
};
