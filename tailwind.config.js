/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#E4792F",
          bg: "#F9F7F6",
          gray: "#6A7282",
          dark: "#3B322C",
        },
      },
    },
  },
  plugins: [],
}