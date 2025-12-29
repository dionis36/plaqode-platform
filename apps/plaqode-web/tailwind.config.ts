import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "blue",
                secondary: "red",
                dark: "#121212",
                text: "#4A5568",
                light: "#FAFAFA",
                bg: "#efefef",
            },
            fontFamily: {
                sans: ["'Open Sans'", "var(--font-sans)", "ui-sans-serif", "system-ui"],
                merriweather: ["'Merriweather'", "var(--font-merriweather)", "serif"],
            },
            fontSize: {
                "display-xl": "var(--text-display-xl)",
                "display-lg": "var(--text-display-lg)",
                "display-md": "var(--text-display-md)",
                // Keep the manual ones if they are used elsewhere
                "xlg": "4.5rem",
                "lg": "3rem",
                "sm-heading": "2.5rem",
            },
            backgroundImage: {
                "hero-pattern": "url('/img/hero-bg.jpg')",
            },
        },
    },
    plugins: [],
};

export default config;
