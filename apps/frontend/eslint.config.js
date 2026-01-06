import { baseEslintConfig } from '@packages/config/eslint'
// @ts-check
import { tanstackConfig } from '@tanstack/eslint-config'

const config = await baseEslintConfig()

const basePlugins = new Set()
config.forEach((c) => {
	if (c.plugins) {
		Object.keys(c.plugins).forEach((p) => basePlugins.add(p))
	}
})

const cleanTanstackConfig = tanstackConfig.map((c) => {
	if (!c.plugins) return c

	const entries = Object.entries(c.plugins).filter(([key]) => !basePlugins.has(key))

	if (entries.length === Object.keys(c.plugins).length) {
		return c
	}

	return {
		...c,
		plugins: Object.fromEntries(entries),
	}
})

export default [...config, ...cleanTanstackConfig]
