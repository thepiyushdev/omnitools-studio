/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          950: '#07090e',
          900: '#0b0f19',
          850: '#111726',
          800: '#172033',
          border: 'rgba(255, 255, 255, 0.08)',
          accent: '#3b82f6',
          glow: '#60a5fa'
        }
      }
    },
  },
  plugins: [],
}
