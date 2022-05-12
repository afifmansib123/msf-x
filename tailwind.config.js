module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["open sans"],
    },
  },
  // purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [],
};
