import { Icon, IconName } from "./icon.tsx";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	component: Icon,
	title: "Atoms/Icon",
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	argTypes: {
		name: {
			options: IconName,
		},
		width: {
			options: [16, 24, 32, 48, 64],
		},
		height: {
			options: [16, 24, 32, 48, 64],
		},
	},
	args: {
		name: "search",
		width: 24,
		height: 24,
	},
};
