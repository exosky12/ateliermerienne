import path from "node:path";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";

const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [react(), UnoCSS()],
	resolve: {
		alias: {
			"@": path.resolve(dirname, "./src"),
		},
	},
});
