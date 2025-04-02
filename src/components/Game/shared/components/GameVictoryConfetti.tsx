import ConfettiExplosion from "react-confetti-blast";
import * as React from "react";

export const GameVictoryConfetti = () => {
    return (
        <ConfettiExplosion
            className="absolute top-1/4 left-1/2 -translate-1/2"
            {...{
                force: 0.6,
                duration: 5000,
                particleCount: 200,
                width: 1200,
                colors: ["#3D4771", "#71864C", "#EB6851", "#41BBC7"],
            }}
        />
    );
};
