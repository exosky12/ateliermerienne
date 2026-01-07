import { defineConfig } from "unocss";
import { sharedConfig } from "@packages/config/unocss";
import { colors } from "./src/tokens";

export default defineConfig({
	...sharedConfig,
	theme: {
		colors,
	},
});
