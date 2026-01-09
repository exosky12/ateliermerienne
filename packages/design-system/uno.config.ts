import { sharedConfig } from "@packages/config/unocss";
import { defineConfig } from "unocss";
import { colors } from "./src/tokens";

export default defineConfig({
	...sharedConfig,
	theme: {
		colors,
	},
});
