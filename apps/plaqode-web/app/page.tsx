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
      <section id="about" aria-label="About Plaqode">
        <AboutSection />
      </section>

      {/* Subtle Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-t border-gray-200/60 dark:border-gray-800/60" />
      </div>

      <section id="services" aria-label="Our Services">
        <BusinessSection />
      </section>
      <Testimonials />

      <Footer />
    </main>
  );
}
