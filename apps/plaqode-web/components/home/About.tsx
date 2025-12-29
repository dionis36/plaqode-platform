import { GradientButton } from "@plaqode-platform/ui";

export default function AboutSection() {
    return (
        <section className="bg-bg text-dark py-24 text-center">
            <div className="max-w-[1000px] mx-auto px-8 relative flex flex-col items-center">
                <h2 className="text-4xl md:text-[3.5rem] font-merriweather font-bold mb-8 leading-tight">
                    The Story So Far...
                </h2>

                <div className="space-y-6 text-lg md:text-xl font-sans text-text leading-relaxed mb-10">
                    <p>
                        We're a creative tech company in <span className="font-bold text-text">Tanzania</span>, passionate about helping people and organizations simplify how they share information. Our team blends design, strategy, and innovation to create QR codes that are not only functional—but memorable.
                    </p>

                    <p>
                        Whether you're launching a campaign, distributing learning materials, or printing business cards, we make sure your QR codes are clear, stylish, and built for impact. We believe in turning everyday interactions into digital opportunities.
                    </p>

                    <div className="pt-4 space-y-2">
                        <p className="font-bold text-text">
                            For us, a QR code is more than just a link, it's a door opening to new possibilities. We're here to help you.
                        </p>
                        <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary italic">
                            "Connect Smarter. Share Faster. Grow Bigger."
                        </p>
                    </div>
                </div>

                <div className="mt-4">
                    <GradientButton href="/about" text="Learn More" size="lg" />
                </div>
            </div>
        </section>
    );
}
