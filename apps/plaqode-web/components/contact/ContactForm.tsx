import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactForm() {
    return (
        <section className="bg-dark text-light py-24 px-4">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold mb-4">Get in Touch</h2>
                    <p className="text-light/70">We&apos;d love to hear from you. Fill out the form below.</p>
                </div>

                <div className="flex flex-col lg:flex-row bg-background rounded-lg overflow-hidden shadow-box-shadow">

                    {/* Info Side */}
                    <div className="lg:w-1/3 bg-gradient-to-b from-dark to-black p-12 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-[50px]"></div>

                        <div>
                            <h3 className="text-2xl font-bold font-serif mb-8">Contact Info</h3>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-4">
                                    <Mail className="text-secondary" />
                                    <p>support@plaqode.com</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="text-secondary" />
                                    <p>+1 (555) 123-4567</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <MapPin className="text-secondary" />
                                    <p>123 Innovation Dr</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <p className="text-sm text-light/50">
                                Operating Hours: <br />
                                Mon - Fri: 9am - 5pm EST
                            </p>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="lg:w-2/3 bg-dark p-12">
                        <form className="flex flex-col gap-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="peer w-full bg-transparent border-b-2 border-light/30 py-2 text-light focus:outline-none focus:border-secondary transition-colors placeholder-transparent"
                                    placeholder="Name"
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute left-0 -top-3.5 text-sm text-light/70 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-light/50 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-secondary peer-focus:text-sm"
                                >
                                    Name
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="peer w-full bg-transparent border-b-2 border-light/30 py-2 text-light focus:outline-none focus:border-secondary transition-colors placeholder-transparent"
                                    placeholder="Email"
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-0 -top-3.5 text-sm text-light/70 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-light/50 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-secondary peer-focus:text-sm"
                                >
                                    Email
                                </label>
                            </div>

                            <div className="relative">
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    className="peer w-full bg-transparent border-b-2 border-light/30 py-2 text-light focus:outline-none focus:border-secondary transition-colors placeholder-transparent resize-none"
                                    placeholder="Message"
                                />
                                <label
                                    htmlFor="message"
                                    className="absolute left-0 -top-3.5 text-sm text-light/70 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-light/50 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-secondary peer-focus:text-sm"
                                >
                                    Message
                                </label>
                            </div>

                            <button className="relative px-8 py-3 w-fit font-semibold text-light bg-transparent rounded-full overflow-hidden transition-all duration-300 hover:scale-105 group mt-4">
                                <span className="absolute inset-0 p-[2px] rounded-full bg-gradient-to-r from-red-600 to-blue-600 [-webkit-mask:linear-gradient(#fff_0_0)content-box,linear-gradient(#fff_0_0)] [-webkit-mask-composite:xor] [mask-composite:exclude] -z-10"></span>
                                <span className="flex items-center gap-2">
                                    Send Message <Send size={18} />
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
