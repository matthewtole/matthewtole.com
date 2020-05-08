module.exports = {
  theme: {
    extend: {
      screens: {
        'dark-mode': { raw: '(prefers-color-scheme: dark)' },
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'brand-light': '#ccdee4',
        brand: '#168198',
        'brand-dark': '#1a404a',

        'cta-light': '#ebc7cb',
        cta: '#981640',
        'cta-dark': '#4c1623',
      },
    },
  },
  variants: {
    borderWidth: ['responsive', 'hover'],
    opacity: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  plugins: [
    require('@tkh/tailwind-plugin-aspect-ratio')(),
    require('tailwind-color-alpha')(),
    require('tailwind-heropatterns')({
      opacity: {
        default: '0.2',
      },
    }),
  ],
};
