import type { Meta, StoryObj } from "@storybook/react-vite";
import { LandingCard } from "./landing_card";

const meta = {
	component: LandingCard,
	title: "Organisms/LandingCard",
} satisfies Meta<typeof LandingCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		position: "topleft",
		imagePath: "/public/landing_card1.png",
		text: "Décrouvir",
		link: "#",
	},
};

export const TopRight: Story = {
	args: {
		position: "topright",
		imagePath: "/public/landing_card1.png",
		text: "Décrouvir",
		link: "#",
	},
};

export const BottomLeft: Story = {
	args: {
		position: "bottomleft",
		imagePath: "/public/landing_card1.png",
		text: "Décrouvir",
		link: "#",
	},
};

export const BottomRight: Story = {
	args: {
		position: "bottomright",
		imagePath: "/public/landing_card1.png",
		text: "Décrouvir",
		link: "#",
	},
};
