import Link from "next/link";
import { LogoLong } from "@/components/Logo/LogoLong";

export const Navbar = () => {
    return (
        <nav className="grid grid-cols-[calc(var(--spacing)*13)_1fr_calc(var(--spacing)*13)] p-4 shadow-md">
            <div></div>
            <div className="flex justify-center">
                <Link href="/">
                    <LogoLong className="w-32" />
                </Link>
            </div>
            <div></div>
        </nav>
    );
};
