/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: "640px",
      tab: "768px",
      laptop: "1024px",
      tv: "1280px",
    },
    extend: {
      backgroundImage: {
        joker: "url(../src/assets/Images/joker.jpeg)",
        alita: "url(../src/assets/Images/alita.jpeg)",
        superman: "url(../src/assets/Images/superman.jpeg)",
        home_bg: "url(../src/assets/Images/home_bg.jpeg)",
      },
      colors: {
        primary_black: "#000814",
        primary_yellow: "#ffc300",
        text_blck: "#000814",
        text_yellow: "#ffc300",
        text_white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};

export default config;
