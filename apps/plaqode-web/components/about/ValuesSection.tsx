import GradientButton from "@/components/ui/GradientButton";

const values = [
    {
        title: "Innovation",
        desc: "We stay ahead of trends to offer QR solutions that are both creative and practical.",
    },
    {
        title: "Accessibility",
        desc: "We help simplify information sharing, especially in underserved communities.",
    },
    {
        title: "Collaboration",
        desc: "We work closely with clients to ensure every QR code serves a real-world need.",
    },
    {
        title: "Quality",
        desc: "From design to print, we focus on clarity, durability, and a professional finish.",
    },
];

export default function ValuesSection() {
    return (
        <section className="bg-dark text-light py-24 px-4">
            <div className="max-w-[900px] mx-auto">
                <div className="mb-16"> 
                    <h2 className="text-4xl md:text-[3.5rem] font-merriweather font-bold text-white mb-8">What Drives Us</h2>

                    <div className="space-y-6 font-sans text-lg md:text-xl leading-relaxed">
                        {values.map((v, i) => (
                            <div key={i} className="flex flex-col md:flex-row md:gap-2">
                                <span className="font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent shrink-0">
                                    {v.title}:
                                </span>
                                <span className="text-light/90">
                                    {v.desc}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-20 pt-10 border-t border-white/5">
                    <p className="text-xl font-bold text-white mb-10 max-w-3xl mx-auto leading-relaxed">
                        Whether you're launching a campaign, hosting an event, or building your brand, we're here to help you connect with confidence, one scan at a time.
                    </p>
                    <GradientButton href="/register" text="Get Started" size="lg" />
                </div>
            </div>
        </section>
    );
}
