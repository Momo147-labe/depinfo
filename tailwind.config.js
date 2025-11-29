/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        // Palette professionnelle : bleu marine / bleu vif
        primary: {
          50: '#edf8ff',
          100: '#d6f0ff',
          200: '#a9e3ff',
          300: '#6fd0ff',
          400: '#33b8ff',
          500: '#0096f2',
          600: '#0077c2',
          700: '#005999',
          800: '#034066',
          900: '#022233',
        },
        "dark-bg": "#071028",
        "dark-card": "#0b1730",
        "dark-surface": "#0f2138",
        "dark-text": "#eef6fb",
        "dark-text-secondary": "#bcd7ea",
        "dark-accent": "#33b8ff",
        "gradient-start": "#03102a",
        "gradient-end": "#072541",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        'card-gradient': 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(56, 189, 248, 0.3)',
        'glow-lg': '0 0 40px rgba(56, 189, 248, 0.2)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 16px 64px rgba(0, 0, 0, 0.4)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "1.5rem",
        "xl": "2rem",
        "2xl": "3rem",
        "full": "9999px"
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  corePlugins: {
    // Force Tailwind à utiliser le format RGB pour les couleurs au lieu de HSL/OKLCH,
    // ce qui est lisible par html2canvas.
    preflight: true, // Gardez ceci
    container: false, // Exemple, si vous ne l'utilisez pas
  },
  plugins: [],
}
