import { Navbar } from "@/components/Navbar/Navbar";
import { TrainingMode } from "@/components/TrainingMode/TrainingMode";

export default function TrainingPage() {
    return (
        <div className="min-h-dvh flex flex-col items-stretch">
            <Navbar />
            <main className="w-full h-0 flex flex-col items-center grow md:gap-12">
                <TrainingMode />
            </main>
        </div>
    );
}

export const dynamic = "force-dynamic";
