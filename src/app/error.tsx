"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <div>
            <h2>Something went wrong!</h2>
            <p>{error.name}</p>
            <p>{error.message}</p>
            <p>{error.digest}</p>
            <p>{error.stack}</p>
            <button onClick={() => reset()}>Try again</button>
        </div>
    );
}
