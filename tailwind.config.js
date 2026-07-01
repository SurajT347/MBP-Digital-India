/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#1B3A6B',
          sky:  '#2563EB',
          accent: '#00C2FF',
          dark: '#0A1628',
          light: '#F0F6FF',
        },
      },
    },
  },
  plugins: [],
}