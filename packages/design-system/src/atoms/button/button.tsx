import { Button as BaseButton } from "@base-ui/react/button";
import { tv, type VariantProps } from "tailwind-variants";
import React from "react";

const button = tv({
	base: "items-center cursor-pointer text-lg font-normal",
	variants: {
		size: {
			sm: "py-1 px-4",
			md: "py-5 px-17",
			lg: "py-3 px-5",
		},

		outlined: {
			true: "bg-white border uppercase hover:bg-dark hover:text-white transition-colors duration-200",
			false: "border-none hover:underline",
		},

		disabled: {
			true: "cursor-not-allowed opacity-80 pointer-events-none",
			false: "",
		},
	},

	defaultVariants: {
		size: "md",
		outlined: true,
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
>(({ size, outlined, disabled, className, href, children, ...props }, ref) => {
	return (
		<BaseButton
			ref={ref}
			className={button({ size, outlined, disabled, className })}
			disabled={disabled}
			render={href ? <a href={href} /> : undefined}
			{...props}
		>
			{children}
		</BaseButton>
	);
});
