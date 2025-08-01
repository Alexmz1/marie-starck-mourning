/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Crimson Text', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'cream': '#faf8f3',
        'cream-dark': '#f5f2ea',
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'floating': 'floating 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        floating: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mourning: {
          "primary": "#000000",
          "secondary": "#333333", 
          "accent": "#666666",
          "neutral": "#1a1a1a",
          "base-100": "#fefefe",
          "base-200": "#faf8f3",
          "base-300": "#f5f2ea",
          "info": "#666666",
          "success": "#333333",
          "warning": "#666666",
          "error": "#1a1a1a",
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
  },
}
