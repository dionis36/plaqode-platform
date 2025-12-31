import SmartNavbar from "@/components/layout/SmartNavbar";
import Footer from "@/components/layout/Footer";
import ServicesContent from "@/components/services/ServicesContent";
import ToolsCatalog from "@/components/services/ToolsCatalog";
import WhyChooseSection from "@/components/services/WhyChooseSection";
import StaticNavbar from "@/components/layout/StaticNavbar";

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-bg">
            <SmartNavbar />

            <div className="relative h-[40vh] min-h-[400px] bg-dark flex flex-col justify-center items-center text-center px-4 overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-20 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-dark z-0" />

                <StaticNavbar />

                <div className="relative z-10">
                    <h1 className="text-5xl md:text-7xl font-merriweather font-bold text-light mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Our Services</h1>
                    <p className="text-light/70 font-sans max-w-xl mx-auto">
                        Transforming Tanzanian businesses with innovative QR code solutions.
                    </p>
                </div>
            </div>

            <ServicesContent />
            <ToolsCatalog />
            <WhyChooseSection />

            <Footer />
        </main>
    );
}
