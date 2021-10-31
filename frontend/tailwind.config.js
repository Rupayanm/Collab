// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "menu-pattern": "url('assets/pattern.svg')",
      },
      fontFamily: {
        logo2: ["Cormorant Garamond", "serif"],
        logoend: ["Architects Daughter", "serif"],
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ["hover", "active"],
      ringOpacity: ["hover", "active"],
      ringColor: ["hover", "active"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
