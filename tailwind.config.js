/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-background': 'linear-gradient(30deg, #1E1E2F 12%, transparent 12.5%, transparent 87%, #1E1E2F 87.5%, #1E1E2F), linear-gradient(150deg, #1E1E2F 12%, transparent 12.5%, transparent 87%, #1E1E2F 87.5%, #1E1E2F), linear-gradient(30deg, #1E1E2F 12%, transparent 12.5%, transparent 87%, #1E1E2F 87.5%, #1E1E2F), linear-gradient(150deg, #1E1E2F 12%, transparent 12.5%, transparent 87%, #1E1E2F 87.5%, #1E1E2F), linear-gradient(60deg, #1E1E2F77 25%, transparent 25.5%, transparent 75%, #1E1E2F77 75%, #1E1E2F77), linear-gradient(60deg, #1E1E2F77 25%, transparent 25.5%, transparent 75%, #1E1E2F77 75%, #1E1E2F77)',
      },
    },
    backgroundSize: {
      'custom-size': '100% 100%',
    },

    backgroundPosition: {
      'custom-position': '0 0, 0 0, 18px 32px, 18px 32px, 0 0, 18px 32px'
    },
  },
  plugins: [],
}