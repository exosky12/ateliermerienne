import { Header } from "./header";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	component: Header,
	title: "Organisms/Header",
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
