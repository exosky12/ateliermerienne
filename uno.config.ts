import { defineConfig, presetWebFonts, presetWind4 } from 'unocss'

export default defineConfig({
  theme: {
    letterSpacing: {
      title: '-0.04em',
      geist: '-0.02em',
    },
    fontFamily: {
      title: 'title',
      sans: 'sans',
    },
    colors: {
      primary: '#4C3225',
      background: '#F2ECE9',
    },
  },

  shortcuts: [
    ['font-title', 'font-title tracking-title'],
    ['font-geist', 'font-sans tracking-geist'],
  ],

  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetWebFonts({
      themeKey: 'fontFamily',
      fonts: {
        sans: 'Geist',
        title: [
          {
            name: 'Playfair Display',
            weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
            italic: true,
          },
        ],
      },
    }),
  ],
})
