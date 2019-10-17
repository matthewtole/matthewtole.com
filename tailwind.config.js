module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'brand-light': '#d3eaf2',
        brand: '#1eaccb',
        'brand-dark': '#205360',

        'cta-light': '#facdd1',
        cta: '#cb1e55',
        'cta-dark': '#621c2c',

        'info-light': '#d9f4fc',
        info: '#2fd3f4',
        'info-dark': '#276472',

        'warning-light': '#fcf3d4',
        warning: '#e5d34e',
        'warning-dark': '#6c642b',

        'success-light': '#d8f9d9',
        success: '#43e067',
        'success-dark': '#2b6a35',

        'danger-light': '#ffd8d4',
        danger: '#e95c5e',
        'danger-dark': '#6f3130',
      },
    },
  },
  variants: {
    borderWidth: ['hover'],
    opacity: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  plugins: [require('tailwindcss-transitions')()],
};
