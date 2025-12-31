import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/About";
import BusinessSection from "@/components/home/Business";
import Testimonials from "@/components/home/Testimonials";
import SmartNavbar from "@/components/layout/SmartNavbar";
import Footer from "@/components/layout/Footer";
import GSAPRegistry from "@/components/GSAPRegistry";
import GradientDivider from "@/components/ui/GradientDivider";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <GSAPRegistry />
      <SmartNavbar />

      <Hero />
      <section id="about" aria-label="About Plaqode">
        <AboutSection />
      </section>

      {/* Animated Gradient Divider */}
      <GradientDivider />

      <section id="services" aria-label="Our Services">
        <BusinessSection />
      </section>
      <Testimonials />

      <Footer />
    </main>
  );
}
