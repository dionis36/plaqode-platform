"use client";

import React, { useState, useRef, useEffect } from "react";
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
    const popoverRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
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

    const handleClick = (e: React.MouseEvent) => {
        if (!disabled) setIsOpen(!isOpen);
    };

    if (minimal) {
        return (
            <div className="relative">
                <button
                    onClick={handleClick}
                    className="w-6 h-6 rounded border border-slate-200 shadow-sm flex-shrink-0 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    style={{ backgroundColor: color }}
                    aria-label="Pick color"
                    disabled={disabled}
                    type="button"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
                </button>
                {/* Popover */}
                {isOpen && (
                    <div
                        ref={popoverRef}
                        className="absolute bottom-full left-0 z-50 mb-2 bg-white rounded-xl shadow-xl border border-slate-100 p-3 animate-in fade-in zoom-in-95 duration-200 flex flex-col gap-3"
                        style={{ minWidth: '200px' }}
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
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-1.5 w-full relative">
            {label && <label className="text-xs font-semibold text-gray-600">{label}</label>}

            <div className={`flex items-center gap-2 border border-slate-200 p-1.5 rounded-lg bg-white transition-all ${disabled ? 'opacity-60 pointer-events-none' : 'hover:border-slate-300'}`}>
                {/* Visual Swatch (Trigger) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
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

            {/* Popover */}
            {isOpen && (
                <div
                    ref={popoverRef}
                    className="absolute top-full left-0 z-50 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 p-3 animate-in fade-in zoom-in-95 duration-200 flex flex-col gap-3"
                    style={{ minWidth: '200px' }}
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
            )}
        </div>
    );
}
