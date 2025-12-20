export default function StorySection() {
    return (
        <section className="bg-dark text-light py-24 px-4 pt-48 -mt-24">
            <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-16 items-center">
                <div className="flex-1">
                    <h2 className="text-4xl md:text-[3.5rem] font-serif font-bold mb-6 leading-tight">
                        Our Story & <br />
                        <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                            Mission
                        </span>
                    </h2>
                </div>

                <div className="flex-1 text-lg leading-relaxed text-light/90">
                    <p className="mb-6">
                        Founded in 2023, Plaqode started with a simple idea: make the physical world clickable.
                        We saw the potential of QR codes to bridge gaps, but existing solutions were clunky and insecure.
                    </p>
                    <p>
                        Today, we power connections for thousands of businesses, ensuring every scan is safe,
                        fast, and meaningful. Our mission is to build the infrastructure for the next generation of
                        hyper-connected experiences.
                    </p>
                </div>
            </div>
        </section>
    );
}
