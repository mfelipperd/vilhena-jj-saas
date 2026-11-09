/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'sans': ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'DM Sans', 'sans-serif'],
      },
      colors: {
        'dojo-red': '#E10600',
        'dojo-orange': '#F97316',
        'dojo-dark': '#140808',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'particle': 'particle 20s linear infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #DC2626, 0 0 10px #DC2626, 0 0 15px #DC2626' },
          '100%': { boxShadow: '0 0 10px #DC2626, 0 0 20px #DC2626, 0 0 30px #DC2626' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) translateX(0px)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100px) translateX(100px)', opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  // NOTE: Tailwind v4 does not load this file unless referenced via @config, so the
  // live theme tokens are in src/index.css. Kept in sync as the DaisyUI "vilhena" theme.
  daisyui: {
    themes: [
      {
        "vilhena": {
          "primary": "#E10600",
          "primary-focus": "#B80500",
          "primary-content": "#FFFFFF",
          "secondary": "#240F0F",
          "secondary-content": "#FFFFFF",
          "accent": "#F2A900",
          "accent-content": "#240F0F",
          "neutral": "#240F0F",
          "neutral-content": "#FAFAFA",
          "base-100": "#FAFAFA",
          "base-200": "#F1EDED",
          "base-300": "#E4DCDC",
          "base-content": "#240F0F",
          "info": "#0284C7",
          "info-content": "#FFFFFF",
          "success": "#1F9D55",
          "success-content": "#FFFFFF",
          "warning": "#F2A900",
          "warning-content": "#240F0F",
          "error": "#8B0000",
          "error-content": "#FFFFFF",
          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.98",
          "--border-btn": "2px",
          "--tab-border": "2px",
          "--tab-radius": "0.5rem",
        },
      },
      {
        "vilhena-dark": {
          "primary": "#E10600",
          "primary-focus": "#B80500",
          "primary-content": "#FFFFFF",
          "secondary": "#240F0F",
          "secondary-content": "#FFFFFF",
          "accent": "#F2A900",
          "accent-content": "#240F0F",
          "neutral": "#351C1C",
          "neutral-content": "#FAFAFA",
          "base-100": "#140808",
          "base-200": "#1D0E0E",
          "base-300": "#271313",
          "base-content": "#F5EEEE",
          "info": "#0EA5E9",
          "info-content": "#FFFFFF",
          "success": "#1F9D55",
          "success-content": "#FFFFFF",
          "warning": "#F2A900",
          "warning-content": "#240F0F",
          "error": "#B80500",
          "error-content": "#FFFFFF",
          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.98",
          "--border-btn": "2px",
          "--tab-border": "2px",
          "--tab-radius": "0.5rem",
        },
      },
    ],
    darkTheme: "vilhena-dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
  },
  plugins: [
    require('tailwindcss-animate'),
    require('daisyui'),
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      });
    },
  ],
}
