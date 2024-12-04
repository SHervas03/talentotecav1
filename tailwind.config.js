/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kelloggs: "#d21245", // Color base
        kelloggsHover: "#b40f3c", // Color para el hover (más oscuro)
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
};
