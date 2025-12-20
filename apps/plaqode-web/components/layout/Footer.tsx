import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-bg py-12 px-4 text-dark font-sans">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">

                {/* Column 1: Logo & Intro */}
                <div className="flex flex-col items-start gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/img/logo-dark.png" alt="Plaqode" className="w-12 h-12" />
                        <p className="font-serif text-3xl font-bold">Plaqode</p>
                    </div>
                    <p className="text-text text-sm leading-relaxed max-w-[80%]">
                        Empowering businesses with intelligent QR code solutions. Connect, track, and grow with our next-gen platform.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h4 className="text-xl font-bold text-text mb-4">Quick Links</h4>
                    <div className="flex flex-col gap-2">
                        {["Home", "About Us", "Services", "Contact", "Privacy Policy"].map(link => (
                            <Link key={link} href="#" className="text-text hover:text-secondary transition-colors">
                                {link}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Column 3: Contact Info */}
                <div>
                    <h4 className="text-xl font-bold text-text mb-4">Contact Us</h4>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="text-text w-5 h-5" />
                            <p className="text-text">123 Innovation Dr, Tech City</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="text-text w-5 h-5" />
                            <p className="text-text">+1 (555) 123-4567</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="text-text w-5 h-5" />
                            <p className="text-text">support@plaqode.com</p>
                        </div>
                    </div>
                </div>

                {/* Column 4: Socials */}
                <div>
                    <h4 className="text-xl font-bold text-text mb-4">Follow Us</h4>
                    <div className="flex gap-6 mt-2">
                        <a href="#" className="text-text hover:text-secondary hover:scale-110 transition-all"><Facebook size={24} /></a>
                        <a href="#" className="text-text hover:text-secondary hover:scale-110 transition-all"><Twitter size={24} /></a>
                        <a href="#" className="text-text hover:text-secondary hover:scale-110 transition-all"><Instagram size={24} /></a>
                        <a href="#" className="text-text hover:text-secondary hover:scale-110 transition-all"><Linkedin size={24} /></a>
                    </div>
                    <p className="text-text/60 text-sm mt-8">
                        &copy; 2024 Plaqode. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}
