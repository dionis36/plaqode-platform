module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "blue", // Matching Plaqode
        secondary: "red", // Matching Plaqode
        dark: "#121212",
        text: "#4A5568",
        light: "#FAFAFA",
        bg: "#efefef",
        accent: "#0EA5E9",
        background: "#FAFAFA",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-merriweather)", "serif"],
        merriweather: ["var(--font-merriweather)", "serif"],
      },
    },
  },
  plugins: [],
};