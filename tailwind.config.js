/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
        // soft white
        primary: {
          color: 'var(--color-primary)',
          border: 'var(--color-primary-border)',
          hover: 'var(--color-primary-hover)',
        },
        // gray
        secondary: {
          color: 'var(--color-secondary)',
          border: 'var(--color-secondary-border)',
          hover: 'var(--color-secondary-hover)',
        },
        // white
        tertiary: {
          color: 'var(--color-tertiary)',
          border: 'var(--color-tertiary-border)',
          hover: 'var(--color-tertiary-hover)',
        },
      },
      textColor: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        tertiary: 'var(--color-text-tertiary)',
      },
      keyframes: {
        help: {
          '0%,100%': { backgroundColor: 'red' },
          '25%': { backgroundColor: 'yellow' },
          '50%': { backgroundColor: 'green' },
          '75%': { backgroundColor: 'brown' },
        },
      },
      animation: {
        help: 'help 0.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
