"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../lib/utils";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string; // Class for the drawer container
    direction?: "left" | "right";
}

export function Drawer({
    isOpen,
    onClose,
    children,
    className,
    direction = "right",
}: DrawerProps) {

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const variants = {
        initial: { x: direction === "right" ? "100%" : "-100%" },
        animate: { x: 0 },
        exit: { x: direction === "right" ? "100%" : "-100%" },
    };

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/50 z-[9998] backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={cn(
                            "fixed top-0 bottom-0 z-[9999] w-[80%] max-w-sm bg-background shadow-xl overflow-y-auto",
                            direction === "right" ? "right-0" : "left-0",
                            "bg-black/95 backdrop-blur-md text-white border-l border-white/10", // Default styling based on design
                            className
                        )}
                    >
                        {/* Close Button - Optional? Best to include strictly or let children handle?
                            Design usually requires a close button. I'll render a default one but allow overriding via children if needed.
                            Actually, better to keep it clean. I'll put a default close button if none is provided?? 
                            No, let's just emit the shell. The User passed specific content.
                            But standard drawers usually have a close mechanism.
                            I'll add a close button absolutely positioned or let the content handle it. 
                            The existing MobileMenu has a header with close.
                            Let's keep this as a pure container. 
                         */}
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
