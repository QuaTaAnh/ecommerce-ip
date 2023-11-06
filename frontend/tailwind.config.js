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
        bgInput: "#f9fafb",
        primary: "#f2f2f2",
        textHover: "#0ea5e9",
        bgDark: "#0f172a",
        bgModalDark: "#1e293b",
        colorBorder: "#dce0e3",
        colorBorderDark: "#3b82f680"
      },
      boxShadow: {
        light: "0 2px 4px rgba(0, 0, 0, 0.1)",
        dark: "0 4px 8px rgba(0, 0, 0, 0.3)",
      },
      margin: {
        marginTopHeader: "44px",
      },
      keyframes: {
        "scale-up-center": {
          "0%":{
            "-webkit-transform": "scale(0.5);",
                    transform: "scale(0.5);"
          },
          "100%": {
            "-webkit-transform": "scale(1);",
                    transform: "scale(1);"
          }
        }, 
        "slideIn": {
          "0%":{
            "opacity": "0;",
            transform: "translateY(20px);"
          },
          "100%":{
            "opacity": "1;",
            transform: "translateY(0);"
          }
        }
      },
      animation: {
        "scale-up-center": "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;",
        "slideIn": "slideIn 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;",
      }
    },
  },
  plugins: [],
}