import type { Preview } from "@storybook/react-vite";
import "../src/css/reset.css";
import "virtual:uno.css";

const preview: Preview = {
	parameters: {
		layout: "centered",
	},
};

export default preview;
