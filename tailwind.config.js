/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    fontSize: {
      fsm: ['14px', '20px'],
      fbase: ['16px', '24px'],
      fmd: ['20px', '28px'],
      flg: ['32px', '40px'],
    },
    textColor: {
      fwhite: "#FFFFFF",
      fblack: "#000000",
      fblack1: "#060914",
      flightgray: "#E4E7EC",
      fgray: "#74777C",
      fdark: "#2B2F43",
      forange: "#F7C478",
      fdarkblue: "#43588E",
      fgreen: "##238044",
      flightgreen: "#38CE6E14",
      fred: "##CE3838",
      flightred: "##CE383814",
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
}
