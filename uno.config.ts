import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: '#000',
      textGrey: '#888888',
      accent: '#FF8C00',
      background: '#F2F6FC',
      strokeGrey: '#E3ECF1',
    },
  },
  presets: [presetUno()],
})
