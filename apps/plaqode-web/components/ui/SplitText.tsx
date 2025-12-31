"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
    text: string;
    className?: string;
    type?: "chars" | "words";
    delay?: number;
}

export default function SplitText({ text, className, type = "chars", delay = 0 }: SplitTextProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: type === "chars" ? 0.03 : 0.08,
                delayChildren: delay,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            x: type === "chars" ? 10 : 0
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    if (type === "words") {
        return (
            <motion.span
                className={cn("inline-block", className)}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {text.split(" ").map((word, index) => (
                    <motion.span key={index} variants={itemVariants} className="inline-block mr-[0.2em] last:mr-0">
                        {word}
                    </motion.span>
                ))}
            </motion.span>
        );
    }

    return (
        <motion.span
            className={cn("inline-block", className)}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible" // Use whileInView to trigger when scrolled into view
            viewport={{ once: true, margin: "-50px" }}
        >
            {text.split("").map((char, index) => (
                <motion.span key={index} variants={itemVariants} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
}
