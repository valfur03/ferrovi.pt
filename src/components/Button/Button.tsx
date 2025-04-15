import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
    "transition-colors px-4 py-2 text-center hover:cursor-pointer cursor-pointer font-bold rounded-lg",
    {
        variants: {
            variant: {
                primary:
                    "text-white bg-blue-700 outline-neutral-300 disabled:text-neutral-400 disabled:bg-neutral-200 disabled:outline-4",
                secondary: "text-neutral-600 border-4 border-neutral-600",
            },
        },
        defaultVariants: {
            variant: "secondary",
        },
    },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    };

export const Button = ({ asChild, className, variant, ...props }: ButtonProps) => {
    const Comp = asChild ? Slot : "button";
    return <Comp {...props} className={buttonVariants({ variant, className })} />;
};
