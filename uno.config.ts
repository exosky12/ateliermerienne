import { defineConfig, presetWind } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: '#4C3225',
      background: '#F2ECE9',
    },
  },
  presets: [presetWind()],
})
