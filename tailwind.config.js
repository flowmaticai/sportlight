/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        flame: {
          DEFAULT: 'hsl(var(--color-flame) / <alpha-value>)',
          dark: 'hsl(var(--color-flame-dark) / <alpha-value>)',
        },
        charcoal: {
          DEFAULT: 'hsl(var(--color-charcoal) / <alpha-value>)',
          soft: 'hsl(var(--color-charcoal-soft) / <alpha-value>)',
        },
        ash: 'hsl(var(--color-ash) / <alpha-value>)',
        electric: {
          DEFAULT: 'hsl(var(--color-electric) / <alpha-value>)',
          dark: 'hsl(var(--color-electric-dark) / <alpha-value>)',
        },
        sand: 'hsl(var(--color-sand) / <alpha-value>)',
        accent: 'hsl(var(--color-accent) / <alpha-value>)',
        'sportlight': {
          'navy': '#104068',
          'coral': '#ff8d90',
          'cream': '#fefbea',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
