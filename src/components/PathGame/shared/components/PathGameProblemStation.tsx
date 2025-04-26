import { PropsWithChildren } from "react";

export type GameProblemStationProps = PropsWithChildren;

export const PathGameProblemStation = ({ children }: GameProblemStationProps) => {
    return (
        <div className="text-white font-bold h-full flex items-center justify-center w-full bg-metro-blue border-metro-green border-6 px-2.5 py-2 text-center">
            <p>{children}</p>
        </div>
    );
};
