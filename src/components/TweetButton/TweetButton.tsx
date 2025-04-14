import { Button, ButtonProps } from "@/components/Button/Button";
import Link from "next/link";
import React from "react";

export type TweetButtonProps = Omit<ButtonProps, "asChild"> & {
    text: string;
};

export const TweetButton = ({ children, text, ...props }: TweetButtonProps) => {
    const url = new URL("https://twitter.com/intent/tweet");
    url.searchParams.set("text", text);

    return (
        <Button {...props} asChild>
            <Link href={url.toString()}>{children}</Link>
        </Button>
    );
};
