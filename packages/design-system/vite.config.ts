import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
