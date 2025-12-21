import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import Logo from "../ui/Logo";

export default function Footer() {
    return (
        <footer className="bg-[#efefef] py-16 px-8 text-dark font-sans border-t border-dark/5">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-left">

                {/* Column 1: Logo & Intro */}
                <div className="flex flex-col items-start gap-6">
                    <Logo color="dark" />
                    <p className="text-text/80 text-md leading-relaxed max-w-[90%]">
                        Scan smart, stay safe. Transforming Tanzanian businesses with innovative QR code solutions.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="lg:pl-8">
                    <h4 className="text-lg font-bold text-text mb-6">Quick Links</h4>
                    <div className="flex flex-col gap-3">
                        {["Home", "About", "Services", "Contact"].map((link) => (
                            <Link
                                key={link}
                                href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                                className="text-text/80 hover:text-secondary transition-colors text-md font-medium"
                            >
                                {link}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Column 3: Contact Info */}
                <div>
                    <h4 className="text-lg font-bold text-text mb-6">Contact Us</h4>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <Phone className="text-text w-5 h-5 group-hover:scale-110 transition-transform" />
                            <p className="text-text/80 text-md font-medium group-hover:text-dark transition-colors">+255 676 372 864</p>
                        </div>
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <Mail className="text-text w-5 h-5 group-hover:scale-110 transition-transform" />
                            <p className="text-text/80 text-md font-medium group-hover:text-dark transition-colors">plaqode@gmail.com</p>
                        </div>
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <MapPin className="text-text w-5 h-5 group-hover:scale-110 transition-transform" />
                            <p className="text-text/80 text-md font-medium group-hover:text-dark transition-colors">Dar es Salaam, Tanzania</p>
                        </div>
                    </div>
                </div>

                {/* Column 4: Socials & Copyright */}
                <div className="flex flex-col items-start lg:items-end">
                    <div className="flex gap-4 mb-6">
                        <a href="#" className="text-text/80 hover:text-secondary hover:scale-110 transition-all"><Facebook size={25} /></a>
                        <a href="#" className="text-text/80 hover:text-secondary hover:scale-110 transition-all"><Twitter size={25} /></a>
                        <a href="#" className="text-text/80 hover:text-secondary hover:scale-110 transition-all"><Linkedin size={25} /></a>
                        <a href="#" className="text-text/80 hover:text-secondary hover:scale-110 transition-all"><Instagram size={25} /></a>
                    </div>

                    <p className="text-text/80 text-sm mt-8 lg:mt-0 font-medium">
                        &copy; 2025 PlaQode. All Rights Reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}
