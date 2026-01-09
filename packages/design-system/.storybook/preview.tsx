import "../src/css/reset.css";
import "virtual:uno.css";
import {
	createMemoryHistory,
	createRootRoute,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => {
			const rootRoute = createRootRoute({
				component: Story,
			});
			const router = createRouter({
				history: createMemoryHistory(),
				routeTree: rootRoute,
			});
			return <RouterProvider router={router} />;
		},
	],
};

export default preview;
