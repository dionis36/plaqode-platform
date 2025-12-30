import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}"
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

            backgroundImage: {
                "hero-pattern": "url('/img/hero-bg.jpg')",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
