/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        defaultHeader: "44px",
      },
      colors: {
        primary: "#f2f2f2",
        textHover: "#0ea5e9",
        bgDark: "#0f172a",
        bgModalDark: "#1e293b",
        colorBorder: "#dce0e3"
      },
      boxShadow: {
        light: "0 2px 4px rgba(0, 0, 0, 0.1)",
        dark: "0 4px 8px rgba(0, 0, 0, 0.3)",
      },
      margin: {
        marginTopHeader: "44px",
      },
    },
  },
  plugins: [],
}