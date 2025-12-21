export default function StorySection() {
    return (
        <section className="bg-dark text-light pt-12 pb-36 px-4">
            <div className="max-w-[900px] mx-auto">
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
        </section>
    );
}
