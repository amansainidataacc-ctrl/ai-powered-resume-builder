/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        accent: { DEFAULT: '#6c63ff', secondary: '#ff6584' },
        success: '#00c896',
      },
      borderRadius: {
        'card': '10px',
        'card-lg': '14px',
        'pill': '999px',
      }
    },
  },
  plugins: [],
}
