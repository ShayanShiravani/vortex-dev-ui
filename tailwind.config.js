/** @type {import('tailwindcss').Config} */
/* eslint-disable */
// eslint-disable
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    // colors: {
    //   black: '#323245',
    // },

    extend: {
      width: {
        100: '25rem',
        104: '26rem',
        150: '37rem'
      },
      colors: {
        primary: '#5158F6',
        secondary: '#F59569',
        input: '#EFF3F8',
        label: '#6F7787',
        black: '#323245',
        'blue-gray-light': '#E9EFF6',
        'primary-light': '#E5E8FF',
        'secondary-light': '#FFECE4',
        'secondary-light-2': '#F6C7B4',
        'disabled-bg': '#C0C0C0',
        'disabled-text': '#939393',
        card: '#E9EFF6'
      },
      backgroundImage: {
        'token-left': "url('/img/tokenLeft-background.svg')",
        gradient: 'linear-gradient(135deg,#5158f6,#822df5 33.76%,#f3a761)',
        'presale-header': "url('/img/presale-header.svg')",
        'public-sale-header': "url('/img/public-header.svg')",
        blob: "url('/img/blob-bg.svg')",
        blur: "url('/images/common/blur-bg.svg')",
      },
      dropShadow: {
        'primary-xl': '0px 8px 18px rgba(81, 88, 246, 0.15)',
      },
      zIndex: {
        100: '100',
        1000: '1000'
      },
    },
  },
  // plugins: [require('@tailwindcss/forms'),require('@tailwindcss/aspect-ratio'),],
  plugins: [],
}
