"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    variant?: "fade-up" | "fade-in" | "slide-left" | "slide-right";
    delay?: number;
    duration?: number;
}

export default function ScrollReveal({
    children,
    className = "",
    variant = "fade-up",
    delay = 0,
    duration = 0.6
}: ScrollRevealProps) {

    const variants = {
        "fade-up": {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
        },
        "fade-in": {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        },
        "slide-left": {
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0 }
        },
        "slide-right": {
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0 }
        }
    };

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration, delay, ease: "easeOut" }}
            variants={variants[variant]}
        >
            {children}
        </motion.div>
    );
}
