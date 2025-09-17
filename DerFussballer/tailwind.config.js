/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#b8d7ff",
          300: "#8bbaff",
          400: "#5f9cff",
          500: "#3b82f6",
          600: "#2f6fe0",
          700: "#2659b8",
          800: "#204b96",
          900: "#1e3a8a"
        }
      },
      boxShadow: {
        soft: "0 10px 25px -10px rgba(0,0,0,0.25)"
      },
      borderRadius: {
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
}