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
                sans: ["var(--font-inter)", "sans-serif"],
                serif: ["var(--font-merriweather)", "serif"],
                merriweather: ["var(--font-merriweather)", "serif"],
            },
            fontSize: {
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
