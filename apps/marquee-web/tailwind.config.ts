import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
                sans: ["'Inter'", "var(--font-inter)", "ui-sans-serif", "system-ui"],
                merriweather: ["'Merriweather'", "var(--font-merriweather)", "serif"],
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
