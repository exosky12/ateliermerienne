import { Image } from "@unpic/react";
import { Button } from "@packages/design-system/button";

interface LandingCardProps {
	position: "topleft" | "topright" | "bottomleft" | "bottomright";
	imagePath: string;
	text: string;
	link?: string;
	textColor?: "white" | "black";
}

export const LandingCard = ({
	position,
	imagePath,
	text,
	link,
	textColor = "white",
}: LandingCardProps) => {
	return (
		<div className="w-2/4 h-auto relative">
			<Button
				size="sm"
				outlined={false}
				href={link ? link : undefined}
				className={`underline absolute ${position === "topleft" ? "top-7 left-7" : position === "topright" ? "top-7 right-7" : position === "bottomleft" ? "bottom-7 left-7" : "bottom-7 right-7"} text-xl uppercase ${textColor === "white" ? "text-white" : "text-black"}`}
			>
				{text}
			</Button>
			<Image
				width={1920}
				height={1080}
				src={imagePath}
				className="w-full h-auto"
			/>
		</div>
	);
};
