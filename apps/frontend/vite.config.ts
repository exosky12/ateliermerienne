import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { devtools } from '@tanstack/devtools-vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

const config = defineConfig({
	resolve: {
		alias: {
			'~/': `${__dirname}/src/`,
			'~registry': `${__dirname}/../server/.adonisjs/client/registry/index.ts`,
		},
	},
	plugins: [
		devtools(),
		viteTsConfigPaths({
			projects: ['./tsconfig.json'],
		}),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
		UnoCSS(),
	],
})

export default config
