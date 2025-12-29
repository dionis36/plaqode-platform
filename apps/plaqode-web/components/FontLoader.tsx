"use client";

import React from "react";

/**
 * FontLoader
 * 
 * Loads Google Fonts via standard <link> tags.
 * This ensures "Merriweather" and "Open Sans" are available globally 
 * under their standard family names.
 */
export default function FontLoader() {
    // We need Merriweather (Serif) and Open Sans (Sans)
    // Weights: 300, 400, 700, 900
    const fonts = [
        "Merriweather:wght@300;400;700;900",
        "Open+Sans:wght@300;400;600;700;800"
    ];

    const fontQuery = fonts.join("&family=");
    const href = `https://fonts.googleapis.com/css2?family=${fontQuery}&display=swap`;

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href={href} rel="stylesheet" />
        </>
    );
}
