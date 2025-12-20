import SmartNavbar from "@/components/layout/SmartNavbar";
import Footer from "@/components/layout/Footer";
import BusinessSection from "@/components/home/Business";

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-bg">
            <SmartNavbar />

            <div className="relative h-[40vh] min-h-[400px] bg-dark flex flex-col justify-center items-center text-center px-4 overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-20 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-bg z-0" />

                <div className="relative z-10 mt-12">
                    <h1 className="text-5xl md:text-[4rem] font-serif font-bold text-light mb-4 text-gradient">Our Services</h1>
                    <p className="text-light/70 font-sans max-w-xl mx-auto">
                        Comprehensive solutions for your digital needs.
                    </p>
                </div>
            </div>

            <div className="-mt-24 relative z-10">
                <BusinessSection />
            </div>

            <Footer />
        </main>
    );
}
