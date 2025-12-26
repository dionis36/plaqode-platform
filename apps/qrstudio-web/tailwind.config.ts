/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
        },
    },
    plugins: [],
}
