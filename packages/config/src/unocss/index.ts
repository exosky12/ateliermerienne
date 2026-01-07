import {
	defineConfig,
	presetWind4,
	presetAttributify,
	presetWebFonts,
} from "unocss";
import { colors } from "@packages/design-system/tokens";

export const sharedConfig = defineConfig({
	theme: {
		colors,
	},
	presets: [
		presetWind4(),
		presetAttributify(),
		presetWebFonts({
			provider: "bunny",
			fonts: {
				sans: ["Outfit", "Inter"],
				mono: ["Playfair Display", "Fira Code"],
			},
		}),
	],
});
