import SmartNavbar from "@/components/layout/SmartNavbar";
import Footer from "@/components/layout/Footer";
import StorySection from "@/components/about/StorySection";
import ValuesSection from "@/components/about/ValuesSection";
import IntroSection from "@/components/about/IntroSection";
import StaticNavbar from "@/components/layout/StaticNavbar";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-bg">
            <SmartNavbar />

            {/* Page Header - Reusing Hero style but simpler */}
            <div className="relative h-[40vh] min-h-[400px] bg-dark flex flex-col justify-center items-center text-center px-4 overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-30 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-dark z-0" />

                <StaticNavbar />

                <div className="relative z-10">
                    <h1 className="text-5xl md:text-[4rem] font-merriweather font-bold text-light mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">About Us</h1>
                    <p className="text-light/70 font-sans max-w-xl mx-auto">
                        Building trust, one code at a time.
                    </p>
                </div>
            </div>

            <IntroSection />
            <ValuesSection />
            <StorySection />

            <Footer />
        </main>
    );
}
