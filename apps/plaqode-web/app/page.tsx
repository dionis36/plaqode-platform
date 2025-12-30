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

      {/* Subtle Gradient Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200/0" />
          </div>
          <div className="relative flex justify-center">
            <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700" />
          </div>
        </div>
      </div>

      <section id="services" aria-label="Our Services">
        <BusinessSection />
      </section>
      <Testimonials />

      <Footer />
    </main>
  );
}
