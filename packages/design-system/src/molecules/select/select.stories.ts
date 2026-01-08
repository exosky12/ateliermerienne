import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./select";

const meta = {
	component: Select,
	title: "Molecules/Select",
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	argTypes: {
		selectItems: {
			control: "object",
		},
	},
	args: {
		selectItems: [
			{
				label: "Français",
				value: "fr",
			},
			{
				label: "Anglais",
				value: "en",
			},
		],
		defaultSelected: "fr",
	},
};
