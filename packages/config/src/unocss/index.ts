import { defineConfig, presetWind4, presetAttributify } from "unocss";
import { colors } from "@packages/design-system/tokens";

export const sharedConfig = defineConfig({
	theme: {
		colors,
	},
	presets: [presetWind4(), presetAttributify()],
});
