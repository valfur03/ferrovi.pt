import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/cn";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
};

export const Button = ({ asChild, className, ...props }: ButtonProps) => {
    const Comp = asChild ? Slot : "button";
    return (
        <Comp
            {...props}
            className={cn(
                "px-4 py-2 text-center text-neutral-600 cursor-pointer border-4 font-bold border-neutral-600 rounded-lg",
                className,
            )}
        />
    );
};
