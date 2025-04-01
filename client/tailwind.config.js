export default  {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bankGothic: ['"BankGothic Lt BT"', 'sans-serif'],
      },
      animation: {
        'slide-right': 'slide-right 1s ease-in-out',
        'slide-up': 'slide-up 1s ease-in-out',
      },
      keyframes: {
        'slide-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
