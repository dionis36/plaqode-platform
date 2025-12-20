import { Share2, Shield, TrendingUp, Zap } from "lucide-react";

const solutions = [
    {
        title: "Dynamic QR Codes",
        description: "Edit content anytime without reprinting. Perfect for marketing campaigns.",
        icon: Zap,
    },
    {
        title: "Secure Data",
        description: "Enterprise-grade encryption keeping your analytics and user data safe.",
        icon: Shield,
    },
    {
        title: "Smart Analytics",
        description: "Track scans, locations, and user behavior in real-time.",
        icon: TrendingUp,
    },
    {
        title: "Easy Sharing",
        description: "Share contact details, wifi access, and files instantly.",
        icon: Share2,
    },
];

export default function BusinessSection() {
    return (
        <section className="bg-bg py-24 px-4 text-center">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-3xl md:text-[3rem] font-serif font-bold mb-4 text-dark">Business Solutions</h2>
                <p className="text-text max-w-2xl mx-auto mb-16">
                    Everything you need to manage your QR codes in one powerful dashboard.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {solutions.map((item, i) => (
                        <div key={i} className="relative bg-light p-8 rounded-lg shadow-light-shadow hover:shadow-box-shadow transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
                            {/* Gradient Top Border */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                            <div className="mb-6">
                                <item.icon className="w-12 h-12 text-secondary mx-auto" />
                            </div>
                            <h3 className="text-xl font-bold font-serif mb-4 text-dark">{item.title}</h3>
                            <p className="text-text text-sm leading-relaxed mb-8">
                                {item.description}
                            </p>
                            <button className="relative px-6 py-2 m-auto text-sm font-semibold text-dark bg-transparent rounded-full overflow-hidden transition-all duration-300 hover:text-white group-hover:bg-gradient-to-r from-secondary to-primary">
                                <span className="absolute inset-0 p-[2px] rounded-full bg-gradient-to-r from-secondary to-primary [-webkit-mask:linear-gradient(#fff_0_0)content-box,linear-gradient(#fff_0_0)] [-webkit-mask-composite:xor] [mask-composite:exclude] -z-10 group-hover:opacity-0"></span>
                                Learn More
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
