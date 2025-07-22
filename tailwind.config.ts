const config = {
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#ffffff',
        third: '#444444',
        fourth: '#929090',
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.3s ease',
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        cloister: ['Cloister', 'Esteban', 'serif'],
        esteban: ['Esteban', 'serif'],
      },
    },
  },
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/app/globals.css',
    './public/**/*.html',
  ],
};

export default config;