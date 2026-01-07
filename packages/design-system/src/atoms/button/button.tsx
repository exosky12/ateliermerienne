import { Button as BaseButton } from "@base-ui/react/button";
import { tv, type VariantProps } from "tailwind-variants";
import React from "react";

const button = tv({
	base: "inline-block flex items-center justify-center cursor-pointer text-base font-bold bg-off-white hover:bg-yellow-100 rounded-lg transition-colors data-[disabled]:cursor-not-allowed data-[disabled]:opacity-80 data-[disabled]:pointer-events-none",
	variants: {
		color: {
			cyan: "bg-cyan-300 hover:bg-cyan-500",
			violet: "bg-violet-300 hover:bg-violet-500",
			red: "bg-red-300 hover:bg-red-500",
			yellow: "bg-yellow-300 hover:bg-yellow-500",
			lime: "bg-lime-300 hover:bg-lime-500",
		},

		size: {
			sm: "py-1 px-4",
			md: "py-2 px-3",
			lg: "py-3 px-5",
		},

		disabled: {
			true: "cursor-not-allowed opacity-80 pointer-events-none",
			false: "",
		},
	},

	defaultVariants: {
		size: "md",
	},
});

export type ButtonVariants = VariantProps<typeof button>;

export interface ButtonProps
	extends
		ButtonVariants,
		Omit<
			React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
			"color"
		> {
	href?: string;
}

export const Button = React.forwardRef<
	HTMLButtonElement | HTMLAnchorElement,
	ButtonProps
>(({ color, size, disabled, className, href, children, ...props }, ref) => {
	return (
		<BaseButton
			ref={ref}
			className={button({ color, size, disabled, className })}
			disabled={disabled}
			render={href ? <a href={href} /> : undefined}
			{...props}
		>
			{children}
		</BaseButton>
	);
});

Button.displayName = "Button";
