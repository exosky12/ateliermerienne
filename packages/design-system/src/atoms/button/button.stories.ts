import { Button } from "./button";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	component: Button,
	title: "Atoms/Button",
	argTypes: {
		outlined: {
			options: [true, false],
			control: { type: "select" },
		},
		size: {
			options: ["sm", "md", "lg"],
			control: { type: "select" },
		},
		children: {
			control: "text",
		},
	},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		children: "Ajouter au panier",
		size: "md",
		outlined: true,
	},
};

export const Link: Story = {
	args: {
		...Base.args,
		href: "https://julesmerienne.dev",
		children: "Go to Website",
		outlined: false,
	},
};
