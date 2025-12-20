import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/About";
import BusinessSection from "@/components/home/Business";
import Testimonials from "@/components/home/Testimonials";
import SmartNavbar from "@/components/layout/SmartNavbar";
import Footer from "@/components/layout/Footer";
import GSAPRegistry from "@/components/GSAPRegistry";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <GSAPRegistry />
      <SmartNavbar />

      <Hero />
      <div id="about">
        <AboutSection />
      </div>
      <div id="services">
        <BusinessSection />
      </div>
      <Testimonials />

      <Footer />
    </main>
  );
}
