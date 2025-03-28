import { type Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          '500': '#24AE7C',
          '600': '#0D2A1F',
        },
        blue: {
          '500': '#79B5EC',
          '600': '#152432',
        },
        red: {
          '500': '#F37877',
          '600': '#3E1716',
          '700': '#F24E43',
        },
        light: {
          '200': '#E8E9E9',
        },
        dark: {
          '200': '#0D0F10',
          '300': '#131619',
          '400': '#1A1D21',
          '500': '#363A3D',
          '600': '#76828D',
          '700': '#ABB8C4',
        },
      },
    },
  },
  plugins: [],
};

export default config;
