/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-rgba": "rgba(0, 0, 0, 0.75)",
      },
      zIndex: {
        '60': "60",
      },
    },
  },
  plugins: [],
};
