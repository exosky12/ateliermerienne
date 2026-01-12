import { Field } from "@packages/design-system/field";
import { Form } from "./form";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	component: Form,
	title: "Organisms/Form",
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		children: [
			<Field type="email" label="Email" placeholder="Entrez ici votre email" />,
			<Field
				type="password"
				label="Mot de passe"
				placeholder="Entrez ici votre mot de passe"
			/>,
		],
		onSubmit: () => {},
		buttonLabel: "Se connecter",
	},
};
