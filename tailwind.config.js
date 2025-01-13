/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,jsx}", // Includes all components
    "./src/pages/**/*.{js,jsx}",      // Includes all pages
    "./src/**/*.{js,jsx,ts,tsx}",     // Includes all files in the src directory
    "./public/index.html",            // Includes the main HTML file
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          600: "#8B4513",
          700: "#5E3210",
        },
      },
    },
  },
  plugins: [],
};
