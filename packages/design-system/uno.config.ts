import { sharedConfig } from "@packages/config/unocss";
import { defineConfig } from "unocss";
import { colors } from "@packages/config/unocss";

export default defineConfig({
	...sharedConfig,
	theme: {
		colors,
	},
});
