import SmartNavbar from "@/components/layout/SmartNavbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-bg">
            <SmartNavbar />

            <div className="relative h-[40vh] min-h-[400px] bg-dark flex flex-col justify-center items-center text-center px-4 overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-20 pointer-events-none" />

                <div className="relative z-10">
                    <h1 className="text-5xl md:text-[4rem] font-serif font-bold text-light mb-4">Contact Us</h1>
                </div>
            </div>

            <div className="-mt-32 relative z-10 pb-12">
                <ContactForm />
            </div>

            <Footer />
        </main>
    );
}
