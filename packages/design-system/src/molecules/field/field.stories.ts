import { Field } from "./field";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	component: Field,
	title: "Molecules/Field",
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	argTypes: {
		label: {
			control: "text",
		},
		placeholder: {
			control: "text",
		},
		description: {
			control: "text",
		},
		errorMessage: {
			control: "text",
		},
	},
	args: {
		label: "Prénom",
		placeholder: "Entrez ici votre prénom",
		description: "Visible sur votre profil",
		errorMessage: "Veuillez entrer votre prénom",
	},
};
