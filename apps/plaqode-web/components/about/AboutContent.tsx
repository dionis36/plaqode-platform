import { GradientButton } from "@plaqode-platform/ui";

// Values Data
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

export default function AboutContent() {
    return (
        <section className="relative bg-dark text-light pt-0 pb-36 px-4 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50 mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 mix-blend-screen" />
            </div>

            {/* Combined Content Container */}
            <div className="relative z-10 flex flex-col gap-24 md:gap-32">

                {/* 1. Intro Section Content */}
                <div className="max-w-[1000px] mx-auto text-center font-sans space-y-8 text-lg md:text-xl leading-relaxed">
                    <p className="font-bold text-white">
                        At PlaQode, we believe that connection should be simple, smart, and meaningful. Founded with a passion for bridging the gap between physical and digital spaces, we specialize in creating customized QR code solutions for individuals, associations, and businesses across Tanzania and beyond.
                    </p>

                    <p className="text-light/80">
                        Our work goes beyond just generating codes—we design experiences. Whether you're an educator sharing learning materials, a professional networking with digital business cards, or an organization amplifying your social media presence, we craft QR codes that reflect your identity and purpose.
                    </p>

                    <p className="text-light/80">
                        We understand that every client is unique. That’s why we offer personalized designs, multi-functional QR categories, and high-quality printing services tailored to your goals. From concept to execution, our team is committed to making your digital access seamless and impactful.
                    </p>
                </div>

                {/* 2. Values Section Content */}
                <div className="max-w-[900px] mx-auto w-full">
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

                {/* 3. Story Section Content */}
                <div className="max-w-[900px] mx-auto w-full">
                    <h2 className="text-4xl md:text-[3.5rem] font-merriweather font-bold mb-10 leading-tight">
                        Digital Innovation <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Made in <br className="hidden md:block" /> Tanzania</span>
                    </h2>

                    <div className="space-y-8 text-lg md:text-xl font-sans text-light/80 leading-relaxed">
                        <p>
                            PlaQode was founded with a mission to help businesses leverage QR code technology to improve customer experiences and streamline operations.
                        </p>
                        <p>
                            Our team of local developers understands the unique challenges and opportunities facing businesses in Tanzania's growing digital economy.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
