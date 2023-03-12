const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', ...fontFamily.sans]
      },
      colors: {
        fg: {
          0: 'rgb(var(--color-fg-0) / <alpha-value>)',
          1: 'rgb(var(--color-fg-1) / <alpha-value>)',
          2: 'rgb(var(--color-fg-2) / <alpha-value>)',
          3: 'rgb(var(--color-fg-3) / <alpha-value>)',
          4: 'rgb(var(--color-fg-4) / <alpha-value>)'
        },
        bg: {
          0: 'rgb(var(--color-bg-0) / <alpha-value>)',
          1: 'rgb(var(--color-bg-1) / <alpha-value>)',
          2: 'rgb(var(--color-bg-2) / <alpha-value>)',
          3: 'rgb(var(--color-bg-3) / <alpha-value>)',
          4: 'rgb(var(--color-bg-4) / <alpha-value>)'
        }
      },
      animation: {
        'slide-up-fade': 'slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right-fade':
          'slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade': 'slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left-fade': 'slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      },
      keyframes: {
        'slide-up-fade': {
          '0%': { opacity: 0, transform: 'translateY(2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        'slide-right-fade': {
          '0%': { opacity: 0, transform: 'translateX(-2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' }
        },
        'slide-down-fade': {
          '0%': { opacity: 0, transform: 'translateY(-2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        'slide-left-fade': {
          '0%': { opacity: 0, transform: 'translateX(2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' }
        }
      }
    }
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
}

// TODO: figure out better solution for dark mode
function invertColorPalette(palette) {
  return {
    50: palette['900'],
    100: palette['800'],
    200: palette['700'],
    300: palette['600'],
    400: palette['500'],
    500: palette['400'],
    600: palette['300'],
    700: palette['200'],
    800: palette['100'],
    900: palette['50']
  }
}
