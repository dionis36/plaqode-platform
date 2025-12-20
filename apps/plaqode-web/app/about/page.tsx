import SmartNavbar from "@/components/layout/SmartNavbar";
import Footer from "@/components/layout/Footer";
import StorySection from "@/components/about/StorySection";
import AboutSection from "@/components/home/About";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-bg">
            <SmartNavbar />

            {/* Page Header - Reusing Hero style but simpler */}
            <div className="relative h-[40vh] min-h-[400px] bg-dark flex flex-col justify-center items-center text-center px-4 overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-20 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-dark z-0" />

                <div className="relative z-10">
                    <h1 className="text-5xl md:text-[4rem] font-serif font-bold text-light mb-4">About Us</h1>
                    <p className="text-light/70 font-sans max-w-xl mx-auto">
                        Building trust, one code at a time.
                    </p>
                </div>
            </div>

            <StorySection />
            <AboutSection /> {/* Reusing the "Values" part roughly */}

            <div className="py-12"></div>
            <Footer />
        </main>
    );
}
