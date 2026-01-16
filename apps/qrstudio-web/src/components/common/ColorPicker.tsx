"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { HexColorPicker } from "react-colorful";
import { Pipette } from "lucide-react";

declare global {
    interface Window {
        EyeDropper?: any;
    }
}

interface ColorPickerProps {
    label?: string;
    color: string;
    onChange: (color: string) => void;
    disabled?: boolean;
}

export default function ColorPicker({ label, color, onChange, disabled = false }: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Calculate position and toggle
    const togglePicker = () => {
        if (disabled) return;

        if (!isOpen && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + window.scrollY + 8,
                left: rect.left + window.scrollX,
            });
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
            window.addEventListener("scroll", () => setIsOpen(false)); // Close on scroll to avoid detached popover
            window.addEventListener("resize", () => setIsOpen(false));
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", () => setIsOpen(false));
            window.removeEventListener("resize", () => setIsOpen(false));
        };
    }, [isOpen]);

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

    return (
        <div className="flex flex-col space-y-1.5 w-full relative" ref={containerRef}>
            {label && <label className="text-sm font-medium text-slate-700">{label}</label>}

            <div className={`flex items-center gap-3 border border-slate-200 p-1.5 rounded-lg bg-white ${disabled ? 'opacity-60 pointer-events-none' : ''}`}>
                {/* Visual Swatch (Trigger) */}
                <button
                    onClick={togglePicker}
                    className="w-10 h-10 rounded-md border-2 border-slate-100 shadow-sm flex-shrink-0 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    style={{ backgroundColor: color }}
                    type="button"
                />

                {/* Hex Input */}
                <div className="flex-1 flex items-center bg-slate-50 rounded-md px-3 border border-transparent focus-within:bg-white focus-within:border-blue-500 transition-all">
                    <span className="text-slate-400 text-sm font-mono mr-2 select-none">#</span>
                    <input
                        type="text"
                        value={color.replace('#', '').toUpperCase()}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^[0-9A-Fa-f]{0,6}$/.test(val)) {
                                onChange(`#${val}`);
                            }
                        }}
                        className="w-full h-10 text-sm font-mono font-medium text-slate-700 bg-transparent outline-none uppercase"
                        disabled={disabled}
                        maxLength={6}
                    />
                </div>
            </div>

            {/* Popover via Portal */}
            {isOpen && typeof document !== 'undefined' && createPortal(
                <div
                    ref={popoverRef}
                    className="absolute z-[9999] mt-2 bg-white rounded-xl shadow-xl border border-slate-100 p-3 flex flex-col gap-3"
                    style={{
                        top: coords.top,
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
                            className="flex items-center justify-center gap-2 w-full py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                        >
                            <Pipette size={16} />
                            Pick from screen
                        </button>
                    )}
                </div>,
                document.body
            )}
        </div>
    );
}
