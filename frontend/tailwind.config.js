// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "menu-pattern": "url('assets/pattern.svg')",
      },
      fontFamily: {
        logo2: ["Cormorant Garamond", "serif"],
        logoend: ["Architects Daughter", "serif"],
      },
      colors: {
        twitter: "#1DA1F2",
        linkedin: "#0A66C2",
        facebook: "#4867AA",
        github: "#6e5494",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/typography"),
  ],
};
