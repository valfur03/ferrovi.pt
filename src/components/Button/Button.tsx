import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className="px-4 py-2 text-neutral-600 cursor-pointer border-4 font-bold border-neutral-600 rounded-lg"
        />
    );
};
