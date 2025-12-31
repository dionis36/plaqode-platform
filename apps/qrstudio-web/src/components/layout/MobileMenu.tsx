"use client";

import Link from "next/link";
import { X, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const HOME_URL = process.env.NEXT_PUBLIC_PLAQODE_WEB_URL || "http://localhost:3000";

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/50 z-[20] backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                        className="fixed top-0 right-0 h-full w-[80%] min-w-[300px] max-w-sm bg-slate-900/95 backdrop-blur-md z-[1000] p-6 text-white flex flex-col justify-between shadow-2xl"
                    >
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-2">
                                    <img src="/img/qr-code-2.png" alt="Plaqode" className="w-10 h-10 object-contain" />
                                    <p className="font-serif text-xl font-bold">Plaqode</p>
                                </div>
                                <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                                    <X size={28} />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-4">
                                {["Home", "About", "Services", "Contact"].map((item) => (
                                    <div key={item} className="border-b border-white/10 pb-4">
                                        <a
                                            href={`${HOME_URL}${item === "Home" ? "/" : `/${item.toLowerCase()}`}`}
                                            className="text-lg font-medium hover:text-blue-400 transition-colors block"
                                            onClick={onClose}
                                        >
                                            {item}
                                        </a>
                                    </div>
                                ))}
                                <div className="pt-4">
                                    <a
                                        href={`${HOME_URL}/auth/login`}
                                        className="block w-full py-3 text-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg hover:shadow-lg transition-all"
                                        onClick={onClose}
                                    >
                                        Login
                                    </a>
                                </div>
                            </nav>
                        </div>

                        <div>
                            <p className="text-sm text-white/70 mb-6">
                                Next Generation QR Code Solutions. Smart, Secure, Scalable.
                            </p>
                            <div className="flex gap-6">
                                <a href="#" className="hover:text-blue-400 hover:scale-110 transition-all"><Facebook /></a>
                                <a href="#" className="hover:text-blue-400 hover:scale-110 transition-all"><Twitter /></a>
                                <a href="#" className="hover:text-blue-400 hover:scale-110 transition-all"><Instagram /></a>
                                <a href="#" className="hover:text-blue-400 hover:scale-110 transition-all"><Linkedin /></a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
