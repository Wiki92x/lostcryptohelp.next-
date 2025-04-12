/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts}', // 👈 useful if you use classNames in util funcs
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6D28D9',   // purple-700
        secondary: '#9333EA', // purple-600
        accent: '#22D3EE',    // cyan-400
        danger: '#EF4444',    // red-500 for alerts
        success: '#10B981',   // green-500 for success feedback
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        fade: 'fadeIn 1s ease-in-out',
        slide: 'slideUp 0.5s ease-out',
        bounceSlow: 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // ✅ better form input styling
    require('@tailwindcss/typography'), // ✅ for readable content blocks
  ],
  corePlugins: {
    preflight: true,
  },
};
