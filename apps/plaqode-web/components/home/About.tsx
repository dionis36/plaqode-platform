export default function AboutSection() {
    return (
        <section className="bg-light text-dark py-24 text-center">
            <div className="max-w-[1200px] mx-auto px-8 relative">
                <h2 className="text-3xl md:text-[3rem] font-serif font-bold mb-2">About Us</h2>
                <p className="text-lg font-sans text-text leading-relaxed max-w-4xl mx-auto my-6">
                    We are dedicated to providing the most secure and efficient QR code management platform.
                    Connecting the physical and digital worlds seamlessly.
                </p>

                <p className="text-xl font-bold my-8">
                    <strong className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                        Powering the Future of Connectivity
                    </strong>
                </p>

                <div className="mt-12">
                    <button className="relative px-8 py-4 font-semibold text-lg text-dark bg-transparent rounded-full overflow-hidden transition-all duration-300 hover:scale-105">
                        <span className="absolute inset-0 p-[2px] rounded-full bg-gradient-to-r from-secondary to-primary [-webkit-mask:linear-gradient(#fff_0_0)content-box,linear-gradient(#fff_0_0)] [-webkit-mask-composite:xor] [mask-composite:exclude] -z-10"></span>
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
}
