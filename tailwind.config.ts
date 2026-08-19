import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray.700'),
            '--tw-prose-headings': theme('colors.gray.900'),
            '--tw-prose-links': theme('colors.brand.600'),
            '--tw-prose-code': theme('colors.brand.600'),
            '--tw-prose-pre-bg': theme('colors.gray.900'),
            '--tw-prose-pre-code': theme('colors.gray.100'),
            '--tw-prose-quote-borders': theme('colors.brand.200'),
            '--tw-prose-th-borders': theme('colors.gray.200'),
            '--tw-prose-td-borders': theme('colors.gray.100'),
            '.dark &': {
              '--tw-prose-body': theme('colors.gray.300'),
              '--tw-prose-headings': theme('colors.white'),
              '--tw-prose-links': theme('colors.brand.400'),
              '--tw-prose-code': theme('colors.brand.400'),
              '--tw-prose-pre-bg': theme('colors.gray.900'),
              '--tw-prose-pre-code': theme('colors.gray.100'),
              '--tw-prose-quote-borders': theme('colors.brand.800'),
              '--tw-prose-th-borders': theme('colors.gray.700'),
              '--tw-prose-td-borders': theme('colors.gray.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config