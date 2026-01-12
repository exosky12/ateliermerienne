import { Button } from "@packages/design-system/button";
import React from "react";

interface FormProps {
	children?: React.ReactNode | React.ReactNode[];
	onSubmit: React.FormEventHandler<HTMLFormElement>;
	buttonLabel: string;
}

export const Form = ({ children, onSubmit, buttonLabel }: FormProps) => {
	return (
		<form onSubmit={onSubmit} className="max-w-96 w-full">
			<div className="flex flex-col gap-4">
				<div className="flex-row-span-2 flex-wrap flex gap-1">{children}</div>

				<Button type="submit">{buttonLabel}</Button>
			</div>
		</form>
	);
};
