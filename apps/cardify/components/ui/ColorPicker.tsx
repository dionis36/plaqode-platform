"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { HexColorPicker } from "react-colorful";
import { Pipette } from "lucide-react"; // Import icon

declare global {
    interface Window {
        EyeDropper?: any;
    }
}

interface ColorPickerProps {
    label?: string; // Optional label, e.g. "Background"
    color: string;
    onChange: (color: string) => void;
    disabled?: boolean;
    minimal?: boolean; // New prop for compact mode
}

export default function ColorPicker({ label, color, onChange, disabled = false, minimal = false }: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState<{ top?: number; left: number; bottom?: number }>({ left: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Calculate position and toggle
    const togglePicker = () => {
        if (disabled) return;

        if (!isOpen && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const POPOVER_HEIGHT = 220; // Estimated height for DECISION only
            const VIEWPORT_HEIGHT = window.innerHeight;

            // Check if it fits below
            const spaceBelow = VIEWPORT_HEIGHT - rect.bottom;
            const shouldFlip = spaceBelow < POPOVER_HEIGHT && rect.top > POPOVER_HEIGHT; // Flip if tight below & space above

            if (shouldFlip) {
                // FLIP: Position using BOTTOM relative to viewport
                setCoords({
                    left: rect.left,
                    bottom: VIEWPORT_HEIGHT - rect.top + 4, // 4px gap above input
                    top: undefined
                });
            } else {
                // DEFAULT: Position using TOP relative to viewport
                setCoords({
                    left: rect.left,
                    top: rect.bottom + 4, // 4px gap below input
                    bottom: undefined
                });
            }

            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                isOpen &&
                popoverRef.current &&
                !popoverRef.current.contains(target) &&
                containerRef.current &&
                !containerRef.current.contains(target)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            window.addEventListener("scroll", () => setIsOpen(false), { capture: true }); // Close on ANY scroll (capture)
            window.addEventListener("resize", () => setIsOpen(false));
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", () => setIsOpen(false), { capture: true });
            window.removeEventListener("resize", () => setIsOpen(false));
        };
    }, [isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setIsOpen(false);
        }
    };

    const [hasEyeDropper, setHasEyeDropper] = useState(false);

    useEffect(() => {
        setHasEyeDropper(!!window.EyeDropper);
    }, []);

    const handleEyeDropper = async () => {
        if (!window.EyeDropper) return;
        const eyeDropper = new window.EyeDropper();
        try {
            const result = await eyeDropper.open();
            onChange(result.sRGBHex);
        } catch (e) {
            // User canceled
        }
    };

    // Shared Popover Content
    const PopoverContent = (
        <div
            ref={popoverRef}
            className="fixed z-[9999] bg-white rounded-xl shadow-xl border border-slate-100 p-3 animate-in fade-in zoom-in-95 duration-200 flex flex-col gap-3"
            style={{
                top: coords.top,
                bottom: coords.bottom,
                left: coords.left,
                minWidth: '200px'
            }}
        >
            <HexColorPicker
                color={color}
                onChange={onChange}
                style={{ width: "100%", height: "160px" }}
            />
            {hasEyeDropper && (
                <button
                    onClick={handleEyeDropper}
                    className="flex items-center justify-center gap-2 w-full py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                >
                    <Pipette size={14} />
                    Pick from screen
                </button>
            )}
        </div>
    );

    if (minimal) {
        return (
            <div className="relative inline-block" ref={containerRef}>
                <button
                    onClick={togglePicker}
                    className="w-6 h-6 rounded border border-slate-200 shadow-sm flex-shrink-0 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    style={{ backgroundColor: color }}
                    aria-label="Pick color"
                    disabled={disabled}
                    type="button"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
                </button>
                {/* Popover via Portal */}
                {isOpen && typeof document !== 'undefined' && createPortal(PopoverContent, document.body)}
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-1.5 w-full relative" ref={containerRef}>
            {label && <label className="text-xs font-semibold text-gray-600">{label}</label>}

            <div className={`flex items-center gap-2 border border-slate-200 p-1.5 rounded-lg bg-white transition-all ${disabled ? 'opacity-60 pointer-events-none' : 'hover:border-slate-300'}`}>
                {/* Visual Swatch (Trigger) */}
                <button
                    onClick={togglePicker}
                    className="w-8 h-8 rounded-md border border-slate-200 shadow-sm flex-shrink-0 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    style={{ backgroundColor: color }}
                    aria-label="Pick color"
                    disabled={disabled}
                    type="button"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
                </button>

                {/* Hex Input */}
                <div className="flex-1 flex items-center bg-slate-50 rounded-md px-2 border border-transparent focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                    <span className="text-slate-400 text-xs font-mono mr-1 select-none">#</span>
                    <input
                        type="text"
                        value={color.replace('#', '').toUpperCase()}
                        onChange={(e) => {
                            const val = e.target.value;
                            // Basic Hex validation (0-9, A-F)
                            if (/^[0-9A-Fa-f]{0,6}$/.test(val)) {
                                onChange(`#${val}`);
                            }
                        }}
                        onBlur={() => {
                            // Correct incomplete hex on blur? optional.
                            if (color.length < 7) {
                                // could pad or revert
                            }
                        }}
                        className="w-full h-8 text-xs font-mono font-medium text-slate-700 bg-transparent outline-none uppercase"
                        disabled={disabled}
                        maxLength={6}
                    />
                </div>
            </div>

            {/* Popover via Portal */}
            {isOpen && typeof document !== 'undefined' && createPortal(PopoverContent, document.body)}
        </div>
    );
}
