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
				sans: [
					{
						name: "Jost",
						weights: ["100", "200", "300", "400", "500", "600", "700", "800"],
					},
					{
						name: "Inter",
						weights: ["100", "200", "300", "400", "500", "600", "700", "800"],
					},
				],
			},
		}),
	],
});
