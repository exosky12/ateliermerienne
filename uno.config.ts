import { defineConfig, presetWebFonts, presetWind4 } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: '#4C3225',
      background: '#F2ECE9',
    },
  },

  presets: [
    presetWind4(),
    presetWebFonts({
      themeKey: 'font',
      provider: 'bunny',
      fonts: {
        sans: 'Outfit',
        title: [
          {
            name: 'Playfair Display',
            weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
          },
        ],
      },
    }),
  ],
})
