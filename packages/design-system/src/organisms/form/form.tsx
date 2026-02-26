import React from "react";
import { Button } from "@packages/design-system/button";

interface FormProps {
	children?: React.ReactNode | React.ReactNode[];
	onSubmit: React.FormEventHandler<HTMLFormElement>;
	buttonLabel: string;
}

export const Form = ({ children, onSubmit, buttonLabel }: FormProps) => {
	return (
		<form onSubmit={onSubmit} className="mx-auto p-4 max-w-2xl w-full">
			<div className="flex flex-col gap-4">
				<div className="flex-row-span-2 flex flex-wrap gap-1">{children}</div>

				<Button type="submit">{buttonLabel}</Button>
			</div>
		</form>
	);
};
